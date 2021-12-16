powershell -Command "Invoke-WebRequest ftp.gnome.org/pub/GNOME/binaries/win64/gtk+/2.22/gtk+-bundle_2.22.1-20101229_win64.zip -OutFile gtk.zip"
mkdir GTK
powershell Expand-Archive gtk.zip -DestinationPath GTK
move GTK C:\GTK
del gtk.zip
