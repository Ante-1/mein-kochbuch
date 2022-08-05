import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import { trpc } from "../utils/trpc";
import { routes } from "../utils/routes";

const PRODUCT_TITLE1 = "Mein";
const PRODUCT_TITLE2 = "Kochbuch";

const Layout = ({ children }: { children: ReactNode }) => {
  const recipeMutation = trpc.useMutation(["recipes.create-recipe"]);
  const router = useRouter();

  const createRecipe = async () => {
    const recipe = await recipeMutation.mutateAsync();
    router.push(`${routes.createRecipe}/${recipe.id}`);
  };

  return (
    <>
      <Head>
        <title>Mein Kochbuch</title>
        <meta name="description" content="Eine Rezept-Seite mit Zutatensuche" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen">
        {/*<nav className="text-2xl w-full bg-gray-200 py-2 px-4">*/}
        {/*  <span className="absolute text-3xl">*/}
        {/*    Mein <span className="text-blue-500">Kochbuch</span>*/}
        {/*  </span>*/}
        {/*  <ul className="flex items-center justify-center gap-16">*/}
        {/*    <li>*/}
        {/*      <Link href="/">Home</Link>*/}
        {/*    </li>*/}
        {/*    <li>*/}
        {/*      <Link href="/search">Rezept Suchen</Link>*/}
        {/*    </li>*/}
        {/*    <button*/}
        {/*      onClick={createRecipe}*/}
        {/*      className="px-3 pb-1 duration-500 border-2 border-gray-500 rounded shadow-xl motion-safe:hover:scale-105"*/}
        {/*    >*/}
        {/*      Neues Rezept anlegen*/}
        {/*    </button>*/}
        {/*  </ul>*/}
        {/*</nav>*/}
        <ResponsiveAppBar />
        <main className="container mx-auto flex flex-col items-center p-4 text-gray-700">
          {children}
        </main>
      </div>
    </>
  );
};

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Icon and Logo that shows when viewport is desktop size */}
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <span>{PRODUCT_TITLE1}</span> <span>{PRODUCT_TITLE2}</span>
          </Typography>

          {/* burger menu that show when viewport is mobile size */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu button"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* Icon and Logo that shows when viewport is mobile size*/}
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          {/* normal menu (items next to each other) that shows when viewport is desktop size */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Layout;
