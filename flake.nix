{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-parts = {
      url = "github:hercules-ci/flake-parts";
    };
    systems = {
      url = "systems";
    };
    ags = {
      url = "github:aylur/ags";
      inputs.astal.url = "github:aylur/astal?rev=bfa376a3468f7c657e46a87c61ea7e9d8c6336b4";
    };
  };

  outputs = {
    self,
    nixpkgs,
    flake-parts,
    systems,
    ags,
  } @ inputs: let
    mkPkgs = system:
      import nixpkgs {
        inherit system;
      };
  in
    flake-parts.lib.mkFlake {inherit inputs;} {
      systems = import systems;

      perSystem = {system, ...}: let
        pkgs = mkPkgs system;
        name = "matshell";
      in {
        packages.default = ags.lib.bundle {
          inherit pkgs name;
          src = ./.;
          entry = "bundleapp.ts";

          extraPackages =
            (with ags.packages.${system}; [
              io
              notifd
              hyprland
              wireplumber
              mpris
              network
              tray
              bluetooth
              cava
            ])
            ++ (with pkgs; [
              ags.packages.${system}.default
              wrapGAppsHook
              gobject-introspection
              typescript
              dart-sass
              mission-center
              imagemagick_light
              # any other package
            ]);
        };

        devShells.default = pkgs.mkShell {
          inputsFrom = builtins.attrValues {
            inherit (self.packages.${system}) default;
          };
        };
      };

      flake = {
        homeManagerModules = {
          default = self.homeManagerModules.matshell;
          matshell = import ./nix/hm-module.nix self;
        };
      };
    };
}
