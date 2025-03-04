{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-parts = {
      url = "github:hercules-ci/flake-parts";
    };
    systems = {
      url = "systems";
    };
    astal = {
      url = "github:aylur/astal?rev=bfa376a3468f7c657e46a87c61ea7e9d8c6336b4";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    ags = {
      url = "github:aylur/ags";
      inputs.astal.url = "github:aylur/astal?rev=bfa376a3468f7c657e46a87c61ea7e9d8c6336b4";
    };
  };

  outputs = {
    self,
    nixpkgs,
    astal,
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
        packages.default = pkgs.stdenvNoCC.mkDerivation {
          src = ./.;
          inherit name;
          entry = "app.ts";

          nativeBuildInputs = with pkgs; [
            ags.packages.${system}.default
            wrapGAppsHook
            gobject-introspection
            typescript
            dart-sass
            mission-center
            imagemagick_light
          ];

          buildInputs = with astal.packages.${system}; [
            notifd
            hyprland
            wireplumber
            mpris
            network
            tray
            bluetooth
            cava
            # any other package
          ];

          installPhase = ''
            mkdir -p $out/bin
            ags bundle app.ts $out/bin/${name}
            chmod +x $out/bin/${name}
          '';
        };

        devShells.default = pkgs.mkShell {
          nativeBuildInputs = with self.packages.${system}; default.nativeBuildInputs;
          inputsFrom = builtins.attrValues {
            inherit (self.packages.${system}) default;
          };
        };
      };
    };
}
