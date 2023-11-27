import { HashtagIcon, TicketIcon } from "@heroicons/react/24/outline";
import { NavLink } from "~~/components/NavLink";

export const Links = () => {
  return (
    <ul className="flex flex-wrap gap-2 my-4 px-2 justify-center">
      <li>
        <NavLink href="/ticket">
          <TicketIcon className="h-4 w-4" />
          Mint Ticket
        </NavLink>
      </li>
      <li>
        <NavLink href="/ticket/sell">
          <HashtagIcon className="h-4 w-4" />
          Sell Ticket
        </NavLink>
      </li>
    </ul>
  );
};
