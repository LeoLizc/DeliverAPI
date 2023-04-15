import app from './src/app.js';

// Inicia app en puerto 8080
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});
