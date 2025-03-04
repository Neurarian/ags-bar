# Simple Material Design desktop shell made with [Astal](https://github.com/Aylur/astal)

This is heavily inspired by [fufexan's](https://github.com/fufexan/dotfiles) AGSv1 config, tailored to personal taste and my multi-monitor desktop setup on [hyprland](https://github.com/hyprwm/Hyprland). This can be dynamically themed either with the color-theme generation scripts that I yanked and botched from [end-4](https://github.com/end-4/dots-hyprland), or together with the [matugen](https://github.com/InioX/matugen) templates also included here. Some snippets for CPU / RAM widgets are inspired by [AhmedSaadi0](https://github.com/AhmedSaadi0/my-hyprland-config/tree/main). The design is also influenced by [saimoomedits](https://github.com/saimoomedits/eww-widgets).

______________________________________________________________________

### ⛓️ Dependencies

<details>
  <summary>show dependency list</summary>

#### Required:

- astal
- ags
- hyprland
- adw-gtk3-git
- adwaita-icon-theme
- coreutils
- dart-sass
- gawk
- imagemagick
- procps-ng
- ripgrep
- util-linux
- Material Symbols Outlined Font
- ***For the end-4 scripts:***
  - python-materialyoucolor-git
  - gradience-git
  - python-libsass
  - python-material-color-utilities
  - python-build
  - python-pillow
  - python-pywal
  - python-setuptools-scm
  - python-wheel
- ***For matugen:***
  - matugen
  - [image-hct](https://github.com/Neurarian/NixOS-config/tree/master/packages/image-hct) (optional; for additional chroma/tone based theming)

#### Not required but launched by Astal widgets:

- gnome-control-center
- mission-center
- overskride
- pwvucontrol

</details>

### 🛠️ Installation

**Before you start make sure to create a backup of your current config if you want to keep it!**

Clone this repo...

```console
git clone https://github.com/Neurarian/matshell
```

... and link/move/copy its content into ~/.config/astal or your stowed ags dotfiles directory. E.g.

```console
mv ags-bar ~/.config/astal
```

For the color generation with the end-4-scripts to work, run this command to create the necessary additional directories:

```console
mkdir -p $XDG_STATE_HOME/astal/{scss,user} $XDG_CACHE_HOME/astal/user/generated
```

After using hyprpaper or some other means to set your wallpaper, run the script from [end-4](https://github.com/end-4/dots-hyprland) like this:

```console
$HOME/.config/astal/scripts/colorgen.sh "$HOME/.cache/current_wallpaper.jpg" --apply --smart
```

The color generation works better with wallpapers that have a bit of contrast.
For a NixOS implementation and example [script](https://github.com/Neurarian/NixOS-config/blob/master/home/Liqyid/common/optional/scripts/wal_set.nix) for use with hyprpaper, matugen, and a [custom cli utility](https://github.com/Neurarian/NixOS-config/tree/master/packages/image-hct) to get chroma/tone, check my [NixOS-config](https://github.com/Neurarian/NixOS-config).

______________________________________________________________________

### 🌚 Dark example

![screenshot-20240602-010310](https://github.com/Neurarian/ags-bar/assets/110474238/39baf677-26bf-402a-8d33-8a8cd326bbe3)

![screenshot-20240602-010238](https://github.com/Neurarian/ags-bar/assets/110474238/e3e87c15-e8f4-481c-b71a-1625542887d1)

______________________________________________________________________

### 🌞 Light example

![screenshot-20240602-010428](https://github.com/Neurarian/ags-bar/assets/110474238/4efbb62d-b416-44e2-a044-92e4704b3d83)

![screenshot-20240602-005946](https://github.com/Neurarian/ags-bar/assets/110474238/36195074-559a-4a52-ba26-96869a512db1)

______________________________________________________________________

https://github.com/Neurarian/ags-bar/assets/110474238/3f01073e-552a-479b-99f9-d82647138e55
