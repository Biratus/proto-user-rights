import { UtilisateurWithRights } from "@/lib/db/repository/UserRepository";
import { upperFirst } from "@/lib/strings";
import Link from "next/link";

export const GlobalDrawerId = "global-drawer";
const MAIN_TITLE = "Accès rapide";

type MenuItem = {
  label: string;
  href: string;
};

type Menu = { label: string; links: MenuItem[] };

const MODULE_ITEM = { label: "modules", href: `/modules/` };
const PLANNING_ITEM = { label: "planning", href: `/planning/` };
const EVAL_ITEM = { label: "évaluations", href: `/evaluation/` };
const FILIERES_ITEM = { label: "filières", href: `/admin/filieres` };
const FORMATEURS_ITEM = { label: "formateurs", href: `/admin/formateurs` };
const CLIENTS_ITEM = { label: "clients", href: `/admin/clients` };
const UTILISATEURS_ITEM = {
  label: "Utilisateurs",
  href: `/admin/utilisateurs`,
};
const userMenu: { [key: string]: Menu[] } = {
  STAGIAIRE: [
    {
      label: MAIN_TITLE,
      links: [MODULE_ITEM, PLANNING_ITEM, EVAL_ITEM],
    },
  ],
  ADMIN: [
    {
      label: MAIN_TITLE,
      links: [FILIERES_ITEM, FORMATEURS_ITEM, CLIENTS_ITEM],
    },
    {
      label: "Administrateur",
      links: [UTILISATEURS_ITEM],
    },
  ],
  FORMATEUR: [],
};

export default function MenuDrawer({ user }: { user: UtilisateurWithRights }) {
  return (
    <div className="drawer-side">
      <label htmlFor={GlobalDrawerId} className="drawer-overlay"></label>
      <ul className="menu w-80 bg-base-100 p-4 text-base-content drop-shadow-xl">
        {userMenu[user.type!].map((menu, index) => (
          <SubMenu key={index} menu={menu} />
        ))}
      </ul>
    </div>
  );
}

function SubMenu({ menu }: { menu: Menu }) {
  return (
    <>
      <li className="menu-title">
        <span>{menu.label}</span>
      </li>
      {menu.links.map((link, index) => (
        <LinkItem link={link} key={index} />
      ))}
    </>
  );
}

function LinkItem({ link: { label, href } }: { link: MenuItem }) {
  return (
    <li>
      <Link href={href}>{upperFirst(label)}</Link>
    </li>
  );
}
