import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import React from "react";

const Navbar = () => {
  return (
    <React.Fragment>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Profile</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-75 p-3 flex flex-col gap-1">
                <NavigationMenuLink
                  href="/login"
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <div className="text-sm font-medium leading-none">Login</div>
                  <p className="text-sm leading-snug text-muted-foreground mt-1">
                    Access your account dashboard and history.
                  </p>
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Get Started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-75 p-3 flex flex-col gap-1">
                <NavigationMenuLink
                  href="/test"
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <div className="text-sm font-medium leading-none">
                    Instant test
                  </div>
                  <p className="text-sm leading-snug text-muted-foreground mt-1">
                    Launch a quick diagnostic run immediately.
                  </p>
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </React.Fragment>
  );
};

export default Navbar;
