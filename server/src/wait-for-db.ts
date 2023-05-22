import net from 'net';

const waitPort = (options: {
  host: string;
  port: number;
  timeout?: number;
  delay?: number;
}): Promise<void> =>
  new Promise((resolve, reject) => {
    const { host, port, timeout = 15000, delay = 1000 } = options;
    let elapsedTime = 0;

    const checkPort = () => {
      const socket = new net.Socket();

      socket.on('connect', () => {
        socket.destroy();
        resolve();
      });

      socket.on('error', (error) => {
        socket.destroy();
        if (elapsedTime >= timeout) {
          reject(error);
        } else {
          elapsedTime += delay;
          setTimeout(checkPort, delay);
        }
      });

      socket.connect(port, host);
    };

    checkPort();
  });

waitPort({ host: 'localhost', port: 5432 })
  .then(() => {
    console.log('Database is ready!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  });
