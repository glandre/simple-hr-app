# https://barryvanveen.nl/blog/66-connect-to-a-remote-database-using-an-ssh-tunnel-in-laravel
ssh -i ~/.ssh/id_rsa -N -L 3306:127.0.0.1:3306 geraldo@geraldolandre.com
