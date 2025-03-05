self: {
  config,
  pkgs,
  lib,
  ...
}: let
  cfg = config.programs.ags;
in {
  options.programs.ags = {
    matshell.enable = lib.mkEnableOption "matshell";
  };
  config = lib.mkIf cfg.matshell.enable {
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
