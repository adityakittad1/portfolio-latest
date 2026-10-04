import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const commands = [
  "root@server:~# systemctl status nginx",
  "● nginx.service - A high performance web server and a reverse proxy server",
  "   Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)",
  "   Active: active (running) since Sun 2026-10-04 10:23:45 UTC",
  "root@server:~# tail -f /var/log/syslog",
  "Oct  4 10:25:01 server CRON[1234]: (root) CMD (command -v debian-sa1 > /dev/null && debian-sa1 1 1)",
  "Oct  4 10:30:15 server sshd[4567]: Accepted publickey for admin from 192.168.1.100 port 54321 ssh2",
  "root@server:~# docker ps -a",
  "CONTAINER ID   IMAGE         COMMAND                  CREATED       STATUS       PORTS                                   NAMES",
  "a1b2c3d4e5f6   postgres:14   \"docker-entrypoint.s…\"   2 days ago    Up 2 days    0.0.0.0:5432->5432/tcp                  db_prod",
  "f7e8d9c0b1a2   redis:7       \"docker-entrypoint.s…\"   2 days ago    Up 2 days    0.0.0.0:6379->6379/tcp                  cache_prod",
  "root@server:~# htop",
  "  1  [||||||||||||||||||||||||||100.0%]   Tasks: 45, 134 thr; 2 running",
  "  2  [|||||                        15.3%]   Load average: 1.25 1.10 0.95",
  "  Mem[|||||||||||||||||||||||5.2G/16.0G]   Uptime: 45 days, 12:34:56",
  "root@server:~# kubectl get pods -n production",
  "NAME                                READY   STATUS    RESTARTS   AGE",
  "api-deployment-78f9c8d7b6-x8y9z     2/2     Running   0          5d",
  "web-deployment-56a7b8c9d0-a1b2c     1/1     Running   0          5d",
  "root@server:~# nmap -sV -O 10.0.0.1",
  "Starting Nmap 7.92 ( https://nmap.org )",
  "Nmap scan report for router.local (10.0.0.1)",
  "PORT   STATE SERVICE VERSION",
  "22/tcp open  ssh     OpenSSH 8.2p1",
  "80/tcp open  http    nginx 1.18.0",
  "root@server:~# ./deploy.sh --env=prod --force",
  "[INFO] Authenticating with cloud provider...",
  "[INFO] Pushing image to registry: registry.gitlab.com/adityakittad/portfolio:latest",
  "[INFO] Applying Kubernetes manifests...",
  "[SUCCESS] Deployment complete. Routing traffic to new pods."
];

export default function LinuxBackground() {
  const [visibleLines, setVisibleLines] = useState([]);

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      setVisibleLines(prev => {
        const nextLines = [...prev, commands[currentLine]];
        if (nextLines.length > 25) nextLines.shift();
        return nextLines;
      });
      currentLine = (currentLine + 1) % commands.length;
    }, 800); // Add a new line every 800ms to simulate typing/logging

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.04, // Very subtle
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.85rem',
          color: 'var(--color-accent)', // Use the new Emerald green
          lineHeight: '1.5',
          padding: 'var(--space-6)',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all'
        }}
      >
        {visibleLines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </motion.div>
    </div>
  );
}
