repo="https://github.com/Neurarian/matshell/"
dest="$XDG_CONFIG_HOME/ags/"

while true; do
  read -p "Do you want create directories needed for end-4 colorgen scripts (y/n) " yn
  case $yn in
    [yY]) echo "Creating directories..."
          mkdir -p $XDG_STATE_HOME/ags/{scss,user} $XDG_CACHE_HOME/ags/user/generated
          break
          ;;
    [nN]) echo "Skipping..."
          break
          ;;
    *) echo "Invalid response"
       ;;
  esac
done

if [ ! -d "${dest}" ]; then
  echo "Cloning matshell repository..."
  git clone --depth 1 "$repo" "$dest"
else
  echo "Skipping matshell clone ($dest already exists)"
fi

