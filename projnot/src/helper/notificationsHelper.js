import { Alert } from 'react-native';

// Mantido para compatibilidade com o App.js
export const isExpoGo = true;

// 1. Função de permissão (não exige permissões de sistema para alertas em tela)
export async function registerForLocalNotificationsAsync() {
  return true;
}

// 2. Disparo imediato do aviso em tela
export async function triggerLocalNotification(title, body) {
  try {
    Alert.alert(
      `🔔 ${title}`,
      body,
      [{ text: 'OK', style: 'default' }],
      { cancelable: true }
    );
  } catch (error) {
    console.error('Erro ao exibir aviso:', error);
  }
}