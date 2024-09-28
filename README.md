
# Simple bar made with [Aylur's Gtk Shell](https://github.com/Aylur/ags)

This is basically a fork of [fufexan's](https://github.com/fufexan/dotfiles) ags config, tailored to personal taste and my multi-monitor desktop setup on [hyprland](https://github.com/hyprwm/Hyprland). I also stole / butchered the color-theme generation from [end-4](https://github.com/end-4/dots-hyprland). Some snippets for CPU / RAM widgets were yanked from [AhmedSaadi0](https://github.com/AhmedSaadi0/my-hyprland-config/tree/main). The design is also inspired by [saimoomedits](https://github.com/saimoomedits/eww-widgets).

---
### Dependencies


<details>
  <summary>show dependency list</summary>

  - ags
  - hyprland
  - gnome-control-center
  - mission-center
  - overskride
  - python-materialyoucolor-git
  - gradience-git
  - python-libsass
  - python-material-color-utilities
  - python-build
  - python-pillow
  - python-pywal
  - python-setuptools-scm
  - python-wheel
  - adw-gtk3-git
  - adwaita-icon-theme
  - coreutils
  - dart-sass
  - gawk
  - imagemagick
  - procps-ng
  - ripgrep
  - util-linux

</details>

For the color generation to work, you'll need to create additional some additional directories:

```console
mkdir -p $XDG_STATE_HOME/ags/scss $XDG_STATE_HOME/ags/user
```

After using wal or some other means to set your wallpaper, run the script from [end-4](https://github.com/end-4/dots-hyprland) like this:

```console
$HOME/.config/ags/scripts/colorgen.sh "$HOME/.cache/current_wallpaper.jpg" --apply --smart
```

For a NixOS implementation, check my [NixOS-config](https://github.com/Neurarian/NixOS-config).

---

### Dark example
![screenshot-20240602-010310](https://github.com/Neurarian/ags-bar/assets/110474238/39baf677-26bf-402a-8d33-8a8cd326bbe3)

![screenshot-20240602-010238](https://github.com/Neurarian/ags-bar/assets/110474238/e3e87c15-e8f4-481c-b71a-1625542887d1)

---

### Light example
![screenshot-20240602-010428](https://github.com/Neurarian/ags-bar/assets/110474238/4efbb62d-b416-44e2-a044-92e4704b3d83)

![screenshot-20240602-005946](https://github.com/Neurarian/ags-bar/assets/110474238/36195074-559a-4a52-ba26-96869a512db1)

---

https://github.com/Neurarian/ags-bar/assets/110474238/3f01073e-552a-479b-99f9-d82647138e55

