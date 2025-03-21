
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserButton() {
  const { user, userRoles, signOut } = useAuth();
  const { t } = useLanguage();

  if (!user) {
    return (
      <Button asChild variant="outline" size="sm" className="rounded-full">
        <Link to="/auth">
          <User size={18} className="mr-2" />
          {t("auth.signIn")}
        </Link>
      </Button>
    );
  }

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const getRoleText = () => {
    if (userRoles.includes("admin")) return t("auth.admin");
    if (userRoles.includes("host")) return t("auth.host");
    return t("auth.guest");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="rounded-full">
          <User size={18} className="mr-2" />
          {user.email?.split('@')[0]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          {getRoleText()}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem asChild>
          <Link to="/profile">
            {t("auth.profile")}
          </Link>
        </DropdownMenuItem>
        
        {userRoles.includes("host") && (
          <DropdownMenuItem asChild>
            <Link to="/host-dashboard">
              {t("auth.dashboard")}
            </Link>
          </DropdownMenuItem>
        )}
        
        {userRoles.includes("admin") && (
          <DropdownMenuItem asChild>
            <Link to="/admin-dashboard">
              Admin Dashboard
            </Link>
          </DropdownMenuItem>
        )}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          {t("auth.signOut")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
