ORIGIN=$(pwd)/dist
echo $ORIGIN
scp -r $ORIGIN root@172.16.10.91:/data/dtstack/portal-front/current
