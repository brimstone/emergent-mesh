include $(TOPDIR)/rules.mk

PKG_NAME:=emergent-mesh
PKG_RELEASE:=2013-07-28

PKG_LICENSE:=GPLv3
PKG_LICENSE_FILES:=

include $(INCLUDE_DIR)/package.mk

define Package/emergent-mesh
  SECTION:=utils
  CATEGORY:=Emergent Mesh
  TITLE:=Files for Emergent Mesh firmware
endef

define Package/emergent-mesh/description
 Provides file for Emergent Mesh firmwares.
endef

define Build/Prepare
	mkdir -p $(PKG_BUILD_DIR)
	$(CP) ./src/* $(PKG_BUILD_DIR)/
endef

define Package/emergent-mesh/install
	$(INSTALL_DIR) $(1)/etc/crontabs
	$(INSTALL_DATA) ./files/crontab $(1)/etc/crontabs/root
	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_DATA) ./files/network $(1)/etc/config/network
	$(INSTALL_DIR) $(1)/usr/sbin
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/senselink $(1)/usr/sbin/
	$(INSTALL_BIN) ./files/nodeadm $(1)/usr/sbin
	$(INSTALL_BIN) ./files/aps $(1)/usr/sbin
	$(INSTALL_BIN) ./files/captive-portal $(1)/usr/sbin
	# http stuff
	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/httpd $(1)/etc/init.d/
	$(INSTALL_DATA) ./files/httpd.conf $(1)/etc/
	cp -r ./files/www $(1)/
	mkdir $(1)/wiki
endef

$(eval $(call BuildPackage,emergent-mesh))
