<h3 align="center">Chessarbiter</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> Few lines describing your project.
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

Chessarbiter is a bot that allows you to play chess and checkers on discord. One chess match is assigned to one guild and it is not possible to have more than one game in one guild.
There is an option to play PvP and PvC.

## 🏁 Getting Started <a name = "getting_started"></a>


### Prerequisites

To run this bot, you must have node.js installed (minimum version up to 14). After installation in the terminal/PowerShell/CMD enter:
```
npm i -g node-gyp node-pre-gyp
```
If you want to run on Windows, you must also enter PowerShell as an admin
```
npm i -g windows-build-tools
```
In addition, depending on the system, a separate system-dependent configuration must be performed.

#### Windows

It is required to have <a href="http://downloads.sourceforge.net/gladewin32/gtk-dev-2.12.9-win32-2.exe">GTK 2</a> and <a href="http://sourceforge.net/projects/libjpeg-turbo/files/">libjpeg-turbo</a> installed

#### OS X

```
brew install pkg-config cairo pango libpng jpeg giflib librsvg
```

#### Ubuntu

```
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

#### Fedora

```
sudo yum install gcc-c++ cairo-devel pango-devel libjpeg-turbo-devel giflib-devel
```

#### SOlaris

```
pkgin install cairo pango pkg-config xproto renderproto kbproto xextproto
```

#### OpenBSD

```
doas pkg_add cairo pango png jpeg giflib
```

### Installing

After completing the configuration, you should clone the repository
```
git clone https://github.com/Saurus42/chessarbiter.git
```
Then start installing the packages
```
npm i
```


## 🎈 Usage <a name="usage"></a>

To run the bot, you need to generate a data.json file in the main directory of the repository with the following structure
```
{
  "token": "Prefix-Command-Bot",
  "secret": "Your-Token-Bot"
}
```
Then just run the batch file to run.

## ✍️ Authors <a name = "authors"></a>

- [@Saurus42](https://github.com/Saurus42) - Mateusz Krasuski


## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- Everyone who tested the bot during implementation
- Everyone who supported me during my work.
