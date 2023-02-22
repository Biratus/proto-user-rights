import {
  formatFullDate,
  formatFullPrettyDate,
  nbOfDaysBetween,
} from "@/lib/date";
import { Filiere, Interval, Module } from "@/lib/types";
import { startOfToday } from "date-fns";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { Calendar, PenTool, Video } from "react-feather";

const today = startOfToday();

const defaultStagiaire = {
  nom: "Dupont",
  prenom: "Michel",
  filiere: {
    nom: "I-230119-DIS-399-SOPRA-JAVA",
    start: new Date(2023, 0, 15),
    end: new Date(2023, 2, 29),
    formateur: {
      prenom: "Jaden",
      nom: "Lockman",
      mail: "Lockman_Jaden94@yahoo.com",
    },
  },
};

const moduleOfToday: Module = {
  id: "fcff45aa-c138-4514-90f9-ee4df059fa8f",
  name: "ANGULAR",
  start: new Date(2022, 0, 25),
  end: new Date(2022, 0, 26),
  theme: "FRAMEWORKS",
  filiere: "I-230119-DIS-399-SOPRA-JAVA",
  formateur: {
    prenom: "Wallace",
    nom: "Wintheiser",
    mail: "Wintheiser88@yahoo.com",
  },
};

const toEvaluateModules: Module[] = [
  {
    id: "8158f760-1964-402e-89ce-53f4b506cf56",
    name: "SPRING BOOT, REST ET SECURITY",
    start: new Date(2022, 0, 15),
    end: new Date(2022, 0, 16),
    theme: "FRAMEWORKS",
    filiere: "I-230119-DIS-399-SOPRA-JAVA",
    formateur: {
      prenom: "Ramona",
      nom: "Schaefer",
      mail: "Schaefer_Ramona25@yahoo.com",
    },
  },
  {
    id: "9fb3c6df-493a-4bba-8450-5bb66bd06794",
    name: "AGILE SCRUM + SAFE",
    start: new Date(2022, 0, 17),
    end: new Date(2022, 0, 17),
    theme: "METHODES ET OUTILS",
    filiere: "I-230119-DIS-399-SOPRA-JAVA",
    formateur: {
      prenom: "Jamarcus",
      nom: "Beier",
      mail: "Beier_Jamarcus@yahoo.com",
    },
  },
  {
    id: "19050a80-68d7-41d1-bc97-fc6851b57a95",
    name: "UNIX",
    start: new Date(2022, 0, 20),
    end: new Date(2022, 0, 22),
    theme: "FONDAMENTAUX ET BASE DE DONNEES",
    filiere: "I-230119-DIS-399-SOPRA-JAVA",
    formateur: {
      prenom: "Laurie",
      nom: "Leannon",
      mail: "Leannon.Laurie41@gmail.com",
    },
  },
];

export default function StagiaireHomePage({}) {
  const { filiere } = defaultStagiaire;
  return (
    <div className="prose w-full max-w-none px-2 xl:px-36">
      <div className="mx-5 flex items-center justify-between">
        <h2>Tableau de bord - {formatFullPrettyDate(today)}</h2>
        <Link
          prefetch={false}
          href="/planning"
          className="btn-outline btn btn-accent btn-lg"
        >
          Planning <Calendar />
        </Link>
      </div>
      <div className="mt-3 flex flex-row gap-3">
        <FilierePanel filiere={filiere} />
        <ModulePanel module={moduleOfToday} />
        <EvalModulesPanel modules={toEvaluateModules} />
      </div>
    </div>
  );
}
function EvalModulesPanel({ modules }: { modules: Module[] }) {
  return (
    <PanelWrapper>
      <span className="text-center font-bold">Modules à évaluer</span>
      <ul className="menu mt-0 p-2">
        {modules.map((mod, index) => (
          <li className="w-full p-0" key={index}>
            <div className="group flex w-full cursor-pointer items-stretch gap-0 overflow-x-hidden border border-base-300 p-0 shadow-inner">
              <div className="w-full shrink-0 p-2 transition-all duration-300 group-hover:-translate-x-full">
                <strong className="truncate text-xl text-primary">
                  {mod.name}
                </strong>
                <IntervalDisplay start={mod.start} end={mod.end} />
                <div>
                  avec{" "}
                  <strong>
                    {mod.formateur.prenom} {mod.formateur.nom}
                  </strong>
                </div>
              </div>
              <Link
                prefetch={false}
                href={`/modules/${mod.id}`}
                className="flex w-full shrink-0 items-center justify-center bg-primary font-sans text-lg tracking-wide text-primary-content no-underline transition-all duration-300 group-hover:-translate-x-full"
              >
                Evaluer
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </PanelWrapper>
  );
}
function ModulePanel({ module }: { module: Module }) {
  return (
    <PanelWrapper>
      <PanelTitle
        label="Module du jour"
        focus={
          <div className="flex items-center justify-around">
            <strong className="text-primary">{module.name}</strong>
            <Link
              prefetch={false}
              href="/"
              className="btn-outline btn btn-accent btn-square"
            >
              <Video />
            </Link>
          </div>
        }
        interval={module}
      />
      <div>
        avec{" "}
        <strong>
          {module.formateur.prenom} {module.formateur.nom}
        </strong>
      </div>
      <strong className="text-lg">Emargement</strong>
      <div className="btn-group btn-group-vertical w-full self-center xl:w-4/5">
        <Link
          prefetch={false}
          href="/"
          className="btn btn-primary justify-between py-3"
        >
          Après-midi <PenTool />
        </Link>
        <Link
          prefetch={false}
          href="/"
          className="btn btn-primary justify-between py-3"
        >
          Matin <PenTool />
        </Link>
      </div>
    </PanelWrapper>
  );
}
function FilierePanel({ filiere }: { filiere: Filiere }) {
  const nbDaysDone = nbOfDaysBetween(filiere.start, today);
  const nbDaysTotal = nbOfDaysBetween(filiere.start, filiere.end);
  const doneDays = Math.floor((nbDaysDone / nbDaysTotal) * 100);
  return (
    <PanelWrapper className="gap-4">
      <PanelTitle
        label="Vous faites partie de la filiere"
        focus={filiere.nom}
        interval={filiere}
      />
      <div
        className="tooltip flex w-full justify-center"
        data-tip={`${nbDaysDone}/${nbDaysTotal} jours`}
      >
        <progress
          className="progress progress-secondary w-4/5"
          value={doneDays}
          max="100"
        ></progress>
      </div>
      <p>
        Formateur référent :{" "}
        <strong>
          {filiere.formateur.prenom} {filiere.formateur.nom}
        </strong>
      </p>
    </PanelWrapper>
  );
}
function PanelTitle({
  label,
  focus,
  interval: { start, end },
}: {
  label: string;
  focus: string | JSX.Element;
  interval: Interval;
}) {
  return (
    <>
      <span className="text-center font-bold">{label}</span>
      <strong className="text-center text-lg text-primary">{focus}</strong>
      <IntervalDisplay start={start} end={end} />
    </>
  );
}

function IntervalDisplay({ start, end }: Interval) {
  return (
    <div>
      Du <strong>{formatFullDate(start)}</strong> au{" "}
      <strong>{formatFullDate(end)}</strong>
    </div>
  );
}
function PanelWrapper({
  children,
  className = "",
  style = {},
}: PropsWithChildren & { className?: string; style?: any }) {
  return (
    <div
      className={`rounded-box flex w-1/3 flex-col gap-2 border border-base-300 p-3 ${className} glass`}
      style={{ ...style }}
    >
      {children}
    </div>
  );
}
