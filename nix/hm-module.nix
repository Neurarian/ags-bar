self: {
  config,
  pkgs,
  inputs,
  system,
  lib,
  ...
}: let
  cfg = config.programs.ags;

  agsPkgs = inputs.ags.packages.${system};

  requiredDeps = with pkgs; [
    imagemagick
    libgtop
  ];

  guiDeps = with pkgs; [
    gnome-control-center
    mission-center
    overskride
    wlogout
    pwvucontrol
  ];
  astalDeps = with agsPkgs; [
    io
    notifd
    hyprland
    wireplumber
    mpris
    network
    tray
    bluetooth
    cava
  ];

  dependencies = requiredDeps ++ guiDeps ++ astalDeps;
in {
  imports = [
    inputs.ags.homeManagerModules.default
  ];
  options.programs.ags = {
    matshell.enable = lib.mkEnableOption "matshell";
  };
  config = lib.mkIf cfg.matshell.enable {
    programs.ags = {
      enable = true;
      package = agsPkgs.ags.override {
        extraPackages = dependencies;
      };
    };

    systemd.user.services.ags = {
      Unit = {
        Description = "Aylur's Gtk Shell";
        PartOf = [
          "tray.target"
          "graphical-session.target"
        ];
      };
      Service = let
        ags = "${config.programs.ags.package}/bin/ags";
      in {
        ExecStart = "${ags} run";
        ExecReload = "${ags} quit && ${ags} run";
        Restart = "on-failure";
        KillMode = "mixed";
      };
      Install.WantedBy = ["graphical-session.target"];
    };

    home.activation.cloneMatshell = let
      dest = "${config.xdg.configHome}/ags";
      repo = "https://github.com/Neurarian/matshell/";
    in
      lib.hm.dag.entryAfter ["writeBoundary"]
      ''
        if [ ! -d "${dest}" ]; then
          echo "Cloning matshell repository..."
          ${pkgs.git}/bin/git clone --depth 1 ${repo} "${dest}"
        else
          echo "Skipping matshell clone (${dest} already exists)"
        fi
      '';
  };
}
