import { HashtagIcon, UserIcon } from "@heroicons/react/24/outline";
import { NavLink } from "~~/components/NavLink";

export const Links = () => {
  return (
    <ul className="flex flex-wrap gap-2 my-4 px-2 justify-center">
      <li>
        <NavLink href="/universalprofile">
          <UserIcon className="h-4 w-4" />
          Create Profile
        </NavLink>
      </li>
      <li>
        <NavLink href="/universalprofile/fetch">
          <HashtagIcon className="h-4 w-4" />
          Fetch Profile
        </NavLink>
      </li>
      <li>
        <NavLink href="/universalprofile#update">
          <HashtagIcon className="h-4 w-4" />
          Update Profile
        </NavLink>
      </li>
      <li>
        <NavLink href="/universalprofile#permissions">
          <HashtagIcon className="h-4 w-4" />
          Profile Permissions
        </NavLink>
      </li>
    </ul>
  );
};
