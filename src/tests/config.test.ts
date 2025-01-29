import { Config, ConfigData } from '../config'; // Ajusta la ruta al archivo correcto
import * as dotenv from 'dotenv';

// Para simular las variables de entorno durante los tests
dotenv.config();

describe('Config Class', () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeAll(() => {
    // Guardamos el estado original de las variables de entorno
    originalEnv = { ...process.env };
  });

  afterAll(() => {
    // Restauramos las variables de entorno originales después de los tests
    process.env = originalEnv;
  });

  beforeEach(() => {
    // Resetear la instancia de Config antes de cada test
    Config.resetInstance();
  });

  test('debe inicializar la configuración correctamente con variables de entorno', () => {
    // Simular la presencia de variables de entorno necesarias
    process.env.CLIENT_ID = 'test-client-id';
    process.env.CLIENT_SECRET = 'test-client-secret';
    process.env.TOKEN_URL = 'https://example.com/token';
    process.env.FLIGHT_OFFERS_URL = 'https://example.com/flights';
    process.env.PORT = '3000';

    const config: ConfigData = Config.getInstance();

    // Comprobamos que la configuración se cargó correctamente desde las variables de entorno
    expect(config.clientId).toBe('test-client-id');
    expect(config.clientSecret).toBe('test-client-secret');
    expect(config.tokenUrl).toBe('https://example.com/token');
    expect(config.flightOffersUrl).toBe('https://example.com/flights');
    expect(config.port).toBe('3000');
  });

  test('debe manejar valores faltantes en las variables de entorno', () => {
    // Eliminamos las variables de entorno para simular valores faltantes
    delete process.env.CLIENT_ID;
    delete process.env.CLIENT_SECRET;
    delete process.env.TOKEN_URL;
    delete process.env.FLIGHT_OFFERS_URL;
    delete process.env.PORT;

    const config: ConfigData = Config.getInstance();

    // En este caso, deberíamos obtener cadenas vacías como valores por defecto
    expect(config.clientId).toBe('');
    expect(config.clientSecret).toBe('');
    expect(config.tokenUrl).toBe('');
    expect(config.flightOffersUrl).toBe('');
    expect(config.port).toBe('');
  });

  test('debe devolver un valor por defecto cuando algunas variables están ausentes', () => {
    // Solo establecer algunas variables de entorno
    process.env.CLIENT_ID = 'test-client-id';
    process.env.PORT = '3000';

    const config: ConfigData = Config.getInstance();

    // Aseguramos que las variables faltantes tomen el valor por defecto
    expect(config.clientId).toBe('test-client-id');
    expect(config.clientSecret).toBe('');
    expect(config.tokenUrl).toBe('');
    expect(config.flightOffersUrl).toBe('');
    expect(config.port).toBe('3000');
  });

  test('debe inicializar una sola instancia de Config', () => {
    // Simular la presencia de variables de entorno
    process.env.CLIENT_ID = 'test-client-id';
    process.env.CLIENT_SECRET = 'test-client-secret';

    const config1: ConfigData = Config.getInstance();
    const config2: ConfigData = Config.getInstance();

    // Verificar que ambas instancias son la misma (singleton)
    expect(config1).toBe(config2);
  });

  test('debe permitir reiniciar la instancia de Config', () => {
    // Simular la presencia de variables de entorno
    process.env.CLIENT_ID = 'test-client-id';

    const config1: ConfigData = Config.getInstance();
    
    // Resetear la instancia
    Config.resetInstance();

    const config2: ConfigData = Config.getInstance();

    // Verificar que después de resetear, las instancias sean diferentes
    expect(config1).not.toBe(config2);
  });
});