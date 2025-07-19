import app from './app';

const port = process.env.APP_PORT || 3000;

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(0);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
  process.exit(0);
});
