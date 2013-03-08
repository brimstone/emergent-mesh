#
# Copyright (C) 2006-2012 OpenWrt.org
#
# This is free software, licensed under the GNU General Public License v2.
# See /LICENSE for more information.
#

include $(TOPDIR)/rules.mk

PKG_NAME:=brim-mesh
PKG_RELEASE:=2013-02-27

PKG_LICENSE:=GPLv3
PKG_LICENSE_FILES:=

include $(INCLUDE_DIR)/package.mk

define Package/brim-mesh
  SECTION:=utils
  CATEGORY:=Base system
  TITLE:=Files for Brimstone's Mesh Firmware
endef

define Build/Compile
	true
endef

define Package/brim-mesh/description
 Provides file for brimstone's mesh firmwares.
endef

define Package/brim-mesh/install
	$(INSTALL_DIR) $(1)/etc/crontabs
	$(INSTALL_DATA) ./files/crontab $(1)/etc/crontabs/root
	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_DATA) ./files/network $(1)/etc/config/network
	$(INSTALL_DIR) $(1)/usr/sbin
	$(INSTALL_BIN) ./files/nodeadm $(1)/usr/sbin
	# http stuff
	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/httpd $(1)/etc/init.d/
	$(INSTALL_DATA) ./files/httpd.conf $(1)/etc/
	cp -r ./files/www $(1)/
	mkdir $(1)/wiki
endef

$(eval $(call BuildPackage,brim-mesh))
