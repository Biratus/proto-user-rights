"use client";

import CenterWrapper from "@/components/CenterWrapper";
import { mapISO } from "@/lib/date";
import { Module, RawModule } from "@/lib/types";
import { useRouter } from "next/navigation";
import {
  FocusEvent,
  FormEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { Send } from "react-feather";

const firstPart = [
  "Conformité du contenu pédagogique à l'intitulé de la formation",
  " Atteinte des objectifs de la formation",
];
const secPart = [
  "Progression de la formation (durée, rythme, alternance théorie/pratique)",
  "Adéquation des moyens matériels mis à disposition avec le thème de la formation",
];
const thirdPart = [
  "Animation de la formation par le ou les intervenants",
  "Qualité des méthodes pédagogiques",
  "Qualité des supports pédagogiques utilisés",
];

const form = new Map([
  [1, firstPart],
  [2, secPart],
  [3, thirdPart],
]);
const extra = "4_0";

export default function EvalutationStagiaire({
  module: rawModule,
}: {
  module: RawModule;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const modalToggleRef = useRef<HTMLInputElement>(null);
  const falseSubmit = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const [module] = useMemo(
    () => mapISO<Module>([rawModule], ["start", "end"]),
    [rawModule]
  );

  const onSubmit = useCallback((evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const answers = new Map<string, { percent: string; comment: string }>();

    for (let [key, value] of form) {
      for (let i in value) {
        const input = formRef.current!.elements.namedItem(
          `${key}_${i}_v`
        ) as HTMLInputElement;
        const value = input.value;

        const comment = (
          formRef.current!.elements.namedItem(
            `${key}_${i}_c`
          ) as HTMLTextAreaElement
        ).value;
        answers.set(`${key}_${i}`, {
          percent: value,
          comment,
        });
      }
    }
    answers.set(extra, {
      percent: "",
      comment: (
        formRef.current!.elements.namedItem(extra) as HTMLTextAreaElement
      ).value,
    });
    console.log({ answers });
    // Appel API then :
    modalToggleRef.current!.checked = false;
    router.push("/");
  }, []);

  const checkForm = useCallback(() => {
    let inError = false;

    for (let [key, value] of form) {
      for (let i in value) {
        const input = formRef.current!.elements.namedItem(
          `${key}_${i}_v`
        ) as HTMLInputElement;
        const value = input.value;

        if (value == "" || isNaN(parseInt(value))) {
          inError = true;
          input.classList.add("input-error");
        }
      }
    }
    if (!inError) modalToggleRef.current!.checked = true;
    else falseSubmit.current!.classList.add("animate-wiggle-submit");
  }, []);

  return (
    <form ref={formRef} onSubmit={onSubmit}>
      <CenterWrapper className="prose glass m-4 w-auto max-w-none flex-col p-4">
        <h3 className="flex w-full justify-between">
          <span>
            Souvenez-vous <em>{module.name}</em>, c&apos;était avec{" "}
            <em>
              {module.formateur.prenom} {module.formateur.nom}
            </em>
            ...
          </span>
          <button
            ref={falseSubmit}
            onClick={checkForm}
            className="btn-success btn-sm btn flex items-center gap-1"
            type="button"
          >
            Soumettre
            <Send size={22} />
          </button>
        </h3>
        <div className="flex flex-row gap-2">
          <FormPanel
            id={1}
            title="Contenu de la formation"
            questions={form.get(1)!}
          />
          <div className="divider divider-horizontal"></div>
          <FormPanel
            id={2}
            title="Déroulé et organisation matérielle"
            questions={form.get(2)!}
          />
          <div className="divider divider-horizontal"></div>
          <FormPanel
            id={3}
            title="Animation et moyens pédagogique"
            questions={form.get(3)!}
          />
        </div>
      </CenterWrapper>
      <input
        ref={modalToggleRef}
        type="checkbox"
        id="additionalCommentsModal"
        className="modal-toggle"
      />
      <MoreCommentsModal />
    </form>
  );
}
function FormPanel({
  title,
  id,
  questions,
}: {
  title: string;
  id: number;
  questions: string[];
}) {
  const [total, setTotal] = useState(0);
  const totalRef = useRef<HTMLSpanElement>(null);
  const prevValueFocus = useRef(0);

  const inputBlur = useCallback((evt: FocusEvent<HTMLInputElement>) => {
    if (isNaN(parseInt(evt.target.value))) evt.target.value = "0";
    evt.target.classList.remove("input-error");

    setTotal((prevTotal) =>
      Math.floor(
        prevTotal - prevValueFocus.current + parseInt(evt.target.value)
      )
    );
  }, []);

  const saveFocusValue = (evt: FocusEvent<HTMLInputElement>) => {
    prevValueFocus.current =
      evt.target.value != "" ? parseInt(evt.target.value) : 0;
  };

  return (
    <div className="prose flex w-1/3 flex-col">
      <h3 className="flex justify-between">
        <span className="underline underline-offset-4">{title}</span>
        <span
          ref={totalRef}
          className="text-right text-2xl font-bold text-accent"
        >
          {Math.floor(total / questions.length)}%
        </span>
      </h3>
      <div className="flex flex-col gap-2">
        {questions.map((q, i) => (
          <div key={i}>
            <div className="form-control" key={i}>
              <label className="label">
                <h4 className="label-text">{q}</h4>
              </label>
              <label className="input-group">
                <input
                  type="number"
                  className="input-bordered input w-24 bg-opacity-70"
                  onBlur={inputBlur}
                  onFocus={saveFocusValue}
                  name={`${id}_${i}_v`}
                />
                <span className="bg-secondary bg-opacity-70">%</span>
              </label>
            </div>
            <div className="form-control mt-1">
              <label className="input-group input-group-vertical">
                <span className="bg-secondary bg-opacity-70">Commentaires</span>
                <textarea
                  className="textarea-bordered textarea w-full bg-opacity-70"
                  name={`${id}_${i}_c`}
                ></textarea>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MoreCommentsModal() {
  return (
    <div className="modal">
      <div className="glass modal-box">
        <h3>Avant de terminer...</h3>
        <h3 className="text-lg font-bold">
          Vos suggestions pour améliorer cette prestation ?
        </h3>
        <textarea
          name={extra}
          className="textarea-bordered textarea mt-2 w-full bg-opacity-70"
        ></textarea>
        <div className="modal-action">
          <label
            htmlFor="additionalCommentsModal"
            className="btn-outline btn-error btn"
          >
            Annuler
          </label>
          <button
            type="submit"
            className="btn-success btn flex items-center gap-1"
          >
            Soumettre <Send />
          </button>
        </div>
      </div>
    </div>
  );
}
