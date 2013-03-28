all: senselink

%.o: %.c
	$(CC) $(CFLAGS) $(EXTRA_CFLAGS) -c -o $@ $^

senselink: senselink.o
	$(CC) -o $@ $^

clean:
	rm -f *.o senselink
