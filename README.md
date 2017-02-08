#MiKasa

Rudimentary exploration for the idea of a gateway for the Web of Things.

## How this works

This is a express application intended to run in a Rpi at home which idea is you to install services that will be useful (hardware control, storage backup, etc.).

The idea behind this is the miniapps are hot installed from npm packages.

## Examples

Right now if you launch MiKasa gateway there is nothing installed. So you go through an installing phase, and here are the apps that you can install as npm (btw those apps work stand alone too):

- [MiKasa-MediaSync](https://github.com/mi-kasa/mikasa-mediasync) with the [android client](https://github.com/mi-kasa/android-media-sync) allows you to backup your medias while you sleep.

- [MiKasa-Gallery](https://github.com/mi-kasa/mikasa-gallery) it's a simple web app that will display a gallery from your harddrive, in this case used with Mikasa-MediaySync you can browse the backup from your phone.