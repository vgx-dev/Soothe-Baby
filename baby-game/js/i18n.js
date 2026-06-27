const translations = {
  en: {
    tapScreen: "Tap the screen!",
    parentMenu: "Parent Menu",
    resetGame: "Reset Game",
    soundOn: "Sound: ON",
    soundOff: "Sound: OFF",
    close: "Close"
  },
  es: {
    tapScreen: "¡Toca la pantalla!",
    parentMenu: "Menú para padres",
    resetGame: "Reiniciar juego",
    soundOn: "Sonido: ENCENDIDO",
    soundOff: "Sonido: APAGADO",
    close: "Cerrar"
  },
  pt: {
    tapScreen: "Toque na tela!",
    parentMenu: "Menu dos Pais",
    resetGame: "Reiniciar Jogo",
    soundOn: "Som: LIGADO",
    soundOff: "Som: DESLIGADO",
    close: "Fechar"
  },
  de: {
    tapScreen: "Tippe auf den Bildschirm!",
    parentMenu: "Elternmenü",
    resetGame: "Spiel zurücksetzen",
    soundOn: "Ton: AN",
    soundOff: "Ton: AUS",
    close: "Schließen"
  },
  fr: {
    tapScreen: "Touchez l'écran !",
    parentMenu: "Menu Parents",
    resetGame: "Réinitialiser le jeu",
    soundOn: "Son : ACTIVÉ",
    soundOff: "Son : DÉSACTIVÉ",
    close: "Fermer"
  },
  ko: {
    tapScreen: "화면을 터치하세요!",
    parentMenu: "부모님 메뉴",
    resetGame: "게임 초기화",
    soundOn: "소리: 켜짐",
    soundOff: "소리: 꺼짐",
    close: "닫기"
  },
  zh: {
    tapScreen: "请触摸屏幕！",
    parentMenu: "家长菜单",
    resetGame: "重置游戏",
    soundOn: "声音: 开",
    soundOff: "声音: 关",
    close: "关闭"
  },
  ja: {
    tapScreen: "がめんを タップしてね",
    parentMenu: "保護者メニュー",
    resetGame: "ゲームをリセット",
    soundOn: "サウンド: ON",
    soundOff: "サウンド: OFF",
    close: "閉じる"
  }
};

const userLang = navigator.language || navigator.userLanguage;
const langPrefix = userLang.split('-')[0];
export const currentLang = Object.keys(translations).includes(langPrefix) ? langPrefix : 'en';

export function t(key) {
  return translations[currentLang][key] || translations['en'][key];
}

export function initI18n() {
  document.getElementById('title-parent-menu').textContent = t('parentMenu');
  document.getElementById('btn-reset').textContent = t('resetGame');
  document.getElementById('btn-close').textContent = t('close');
  document.getElementById('btn-sound').textContent = t('soundOn');
}
