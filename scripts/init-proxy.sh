dir="$(dirname "$0")"
config=$dir/proxychains.conf
host_ip=$(grep nameserver /etc/resolv.conf | sed 's/nameserver //')
<<<<<<< HEAD
=======
echo "proxying to $host_ip"
>>>>>>> e0053d57f7d76248fd68d9f67ddbf1f64f431ea6
cp $dir/proxychains.template.conf $config 
sed -i "\$s/.*/http $host_ip 7890/" $config
