{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
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
    ags,
  }: let
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};
  in {
    packages.${system}.default = pkgs.stdenvNoCC.mkDerivation rec {
      name = "my-shell";
      src = ./.;

      nativeBuildInputs = [
        ags.packages.${system}.default
        pkgs.wrapGAppsHook
        pkgs.gobject-introspection
        pkgs.typescript
        pkgs.sass
        pkgs.mission-center
      ];

      buildInputs = with astal.packages.${system}; [
        notifd
        hyprland
        wireplumber
        battery
        mpris
        network
        tray
        bluetooth
        # any other package
      ];

      installPhase = ''
        mkdir -p $out/bin
        ags bundle app.ts $out/bin/${name}
        chmod +x $out/bin/${name}
      '';
    };

    devShells.${system}.default = pkgs.mkShell {
      nativeBuildInputs = with self.packages.${system}; default.nativeBuildInputs;
      inputsFrom = builtins.attrValues {
        inherit (self.packages.${system}) default;
      };
    };
  };
}
