export default class LogGane {
  public treatLog(
    playerKill: string,
    playerKilled: string,
    mod: string,
  ): string {
    let log = '';

    switch (mod) {
      case '0':
        log = `${playerKill} matou o player ${playerKilled} com MOD_UNKNOWN`;
        break;

      case '1':
        log = `${playerKill} matou o player ${playerKilled} com MOD_SHOTGUN`;
        break;

      case '2':
        log = `${playerKill} matou o player ${playerKilled} com MOD_GAUNTLET`;
        break;

      case '3':
        log = `${playerKill} matou o player ${playerKilled} com MOD_MACHINEGUN`;
        break;

      case '4':
        log = `${playerKill} matou o player ${playerKilled} com MOD_GRANADE`;
        break;

      case '5':
        log = `${playerKill} matou o player ${playerKilled} com MOD_GRANADE_SPLASH`;
        break;

      case '6':
        log = `${playerKill} matou o player ${playerKilled} com MOD_ROCKET`;
        break;

      case '7':
        log = `${playerKill} matou o player ${playerKilled} com MOD_ROCKET_SPLASH`;
        break;

      case '8':
        log = `${playerKill} matou o player ${playerKilled} com MOD_PLASMA`;
        break;

      case '9':
        log = `${playerKill} matou o player ${playerKilled} com MOD_PLASMA_SPLASH`;
        break;

      case '10':
        log = `${playerKill} matou o player ${playerKilled} com MOD_RAILGUN`;
        break;

      case '11':
        log = `${playerKill} matou o player ${playerKilled} com MOD_LIGHTNING`;
        break;

      case '12':
        log = `${playerKill} matou o player ${playerKilled} com MOD_BFG`;
        break;

      case '13':
        log = `${playerKill} matou o player ${playerKilled} com MOD_BFG_SPLASH`;
        break;

      case '14':
        log = `${playerKill} matou o player ${playerKilled} com MOD_WATER`;
        break;

      case '15':
        log = `${playerKill} matou o player ${playerKilled} com MOD_SLIME`;
        break;

      case '16':
        log = `${playerKill} matou o player ${playerKilled} com MOD_LAVA`;
        break;

      case '17':
        log = `${playerKill} matou o player ${playerKilled} com MOD_CRUSH`;
        break;

      case '18':
        log = `${playerKill} matou o player ${playerKilled} com MOD_TELEGRAF`;
        break;

      case '19':
        log = `${playerKill} matou o player ${playerKilled} com MOD_FALLING`;
        break;

      case '20':
        log = `${playerKill} matou o player ${playerKilled} com MOD_SUICIDE`;
        break;

      case '21':
        log = `${playerKill} matou o player ${playerKilled} com MOD_TARGET_LASER`;
        break;

      case '22':
        log = `${playerKill} matou o player ${playerKilled} com MOD_TRIGGER_HURT`;
        break;

      case '23':
        log = `${playerKill} matou o player ${playerKilled} com MOD_NAIL`;
        break;

      case '24':
        log = `${playerKill} matou o player ${playerKilled} com MOD_CHAINGUN`;
        break;

      case '25':
        log = `${playerKill} matou o player ${playerKilled} com MOD_PROXIMITY_MINE`;
        break;

      case '26':
        log = `${playerKill} matou o player ${playerKilled} com MOD_KAMIKAZE`;
        break;

      case '27':
        log = `${playerKill} matou o player ${playerKilled} com MOD_JUICED`;
        break;

      case '28':
        log = `${playerKill} matou o player ${playerKilled} com MOD_GRAPPLE`;
        break;

      default:
        break;
    }

    return log;
  }
}
