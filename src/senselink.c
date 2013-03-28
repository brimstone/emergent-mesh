//include <errno.h>
#include <string.h>
//include <fcntl.h>
//include <getopt.h>
#include <sys/socket.h>
#include <sys/ioctl.h>
#include <net/if.h>
#include <linux/ethtool.h>
#include <linux/sockios.h>
#include <unistd.h>

int main(int argc, char **argv)
	{
	int skfd = -1;
	char *ifname;
	int retval;

	if( argv[1] )
		ifname = argv[1];
	else
		ifname = "eth0";

	/* Open a socket. */
	if (( skfd = socket( AF_INET, SOCK_DGRAM, 0 ) ) < 0 ) {
		return(-1);
	}

	struct ifreq ifr;
	struct ethtool_value edata;
                                                                                
	memset(&ifr, 0, sizeof(ifr));
	edata.cmd = ETHTOOL_GLINK;

	strncpy(ifr.ifr_name, ifname, sizeof(ifr.ifr_name)-1);
	ifr.ifr_data = (char *) &edata;
                                                                                
	if (ioctl(skfd, SIOCETHTOOL, &ifr) == -1) {
		return 2;
	}
                                                                                
	close(skfd);
	return (edata.data ? 0 : 1);
}

