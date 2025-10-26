module.exports.config = {
    name: "war",
    version: "4.0.0",
    permission: 0,
    credits: "ryuko",
    premium: false,
    description: "sends all 100 tagalog rants sequentially with delays",
    prefix: true,
    category: "fun",
    usages: "war @mention",
    cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
    try {
        const mention = Object.keys(event.mentions);

        if (mention.length === 0) {
            return api.sendMessage("❌ Mention someone para awayin! Usage: !war @mention", event.threadID, event.messageID);
        }

        const targetID = mention[0];
        const targetName = event.mentions[targetID];

        const allRants = [
            "PUTANGINA {name}! Sobrang YABANG mo! Akala mo kung sino ka! Wala kang kwenta! Puro ka DADA lang! Walang GAWA! Tigilan mo yang pagiging MAYABANG mo! TANGA ka ba?! GAGO!",
            "HOY {name}! ULOL! Ang KAPAL ng MUKHA mo! Walang HIYA ka talaga! Puro ka SALITA! WALANG BAYAG! Ang LAKI ng ILONG mo pero WALANG PANLASA! BOBO mo! TANGINA!",
            "{name} GAGO KA! Napaka-ARTE mo! Feeling mo MAGANDA/GWAPO ka?! PANGIT ka GAGO! TANGA! Wala kang UTAK! Puro ka KAARTEHAN! WALANG SILBI! KUPAL!",
            "ABA {name}! TANGINA MO! Puro ka YABANG! Walang LAMAN yang ULO mo! TANGA-TANGA ka! Ang LIIT ng UTAK mo! PURO ka HANGIN! Feeling mo ASTIG ka?! PUTA!",
            "GRABE ka {name}! NAPAKASAMA mo! MASAMANG TAO ka! Walang RESPETO! Walang GALANG! BASTOS ka! Ang PANGIT ng UGALI mo! WALANG ASAL! PUTANGINA!",
            "{name} PUTANGINA! Sobrang KAPAL ng MUKHA mo! Walang KAHIHIYAN! WALANG MODO! Puro ka EPAL! Lagi kang NAKIKISAWSAW! GAGO! ULOL! KUPAL!",
            "HOY {name} GAGO! Tigilan mo yang KAPLASTIKAN mo! PLASTIC ka! FAKE! HINDI ka TUNAY! Puro ka KUNWARI! SALBAHE ka! TANGINA! TANGA!",
            "PUTANGINA mo {name}! Ang YABANG mo SOBRA! Akala mo PERPEKTO ka?! TANGA! Puro ka PAGMAMALAKI! Walang NAAABOT! BOBO! GAGO ka!",
            "{name} WALANG KWENTA KA! BOBO ka! TANGA! Walang UTAK! Puro ka KALOKOHAN! Napaka-GAGO mo! KUPAL! Ang LIIT ng BAYAG mo! PUTANGINA!",
            "ABA {name}! TANGINA! Sobrang SAMA mo! WALANG MODO! Walang GALANG! BASTOS! Napaka-SUNGIT mo! GAGO! Ang PANGIT ng ASAL mo!",
            "GAGO ka {name}! Puro ka HANGIN! WALANG LAMAN! TANGA! Feeling mo TALINO ka?! BOBO ka nga eh! Walang ALAM! PUTANGINA! ULOL!",
            "{name} ULOL KA! Ang KAPAL ng MUKHA mo! Sobrang WALANG HIYA! Napaka-YABANG! MAYABANG! Feeling mo SIKAT ka?! TANGINA! GAGO!",
            "HOY {name}! KUPAL ka! Napaka-SAMA ng UGALI mo! WALANG RESPETO! Puro ka BASTOS! Walang MODO! PUTANGINA! Ang PANGIT mo!",
            "PUTANGINA {name}! Sobrang YABANG mo! Napaka-TAAS ng TINGIN mo sa SARILI mo! TANGA! Wala ka namang KWENTA! BOBO! GAGO!",
            "{name} GAGO! WALANG SILBI ka! Puro ka DADA! SALITA! REKLAMO! Pero WALANG GAWA! TAMAD! PUTANGINA! PARASITE ka!",
            "TANGINA mo {name}! Napaka-ARTE mo! FEELING! Akala mo PERPEKTO ka?! MALI! TANGA ka! BOBO! Walang UTAK! GAGO! ULOL!",
            "ABA {name}! ULOL! Puro ka KAARTEHAN! DRAMA! PARINIG! Napaka-PLASTIC mo! FAKE! KUNWARI! PUTANGINA! SALBAHE!",
            "{name} WALANG HIYA KA! Ang KAPAL ng MUKHA mo! MAYABANG! YABANG! Feeling mo GALING mo?! HINDI! BOBO ka nga eh! TANGINA!",
            "GAGO ka talaga {name}! Napaka-SAMA mo! MASAMA! Walang MODO! Walang GALANG! BASTOS! KUPAL! PUTANGINA! WALANG KWENTA!",
            "HOY {name} TANGA! Puro ka YABANG! MAYABANG! Akala mo ASTIG ka?! HINDI! DUWAG ka nga eh! TAKOT! GAGO! PUTA!",
            "{name} BOBO KA! Walang UTAK! TANGA! HANGAL! Napaka-BURARA mo! IGNORANTE! Walang ALAM! PUTANGINA! ULOL!",
            "PUTANGINA {name}! Napaka-PLASTIC mo! FAKE! KUNWARI! Walang TOTOO! Puro ka PAIMBABAW! MABABAW! GAGO! KUPAL!",
            "TANGINA mo {name}! Sobrang EPAL mo! Lagi kang NAKIKISAWSAW! Walang HIYA! KAPAL ng MUKHA! GAGO! ULOL! TANGA!",
            "{name} KUPAL KA! Napaka-SUNGIT mo! MASUNGIT! SUPLADO/SUPLADA! Ang YABANG! MAYABANG! PUTANGINA! BASTOS!",
            "GAGO ka {name}! Puro ka SALITA! DADA! REKLAMO! Pero WALANG GAWA! TAMAD ka! WALANG AMBAG! TANGINA! PARASITE!",
            "ABA {name}! WALANG KWENTA ka! BOBO! TANGA! Puro ka KALOKOHAN! Napaka-GAGO mo! ULOL! PUTANGINA! HANGAL!",
            "{name} TANGINA! Ang YABANG mo! MAYABANG! Feeling mo MAGALING ka?! HINDI! Puro ka HANGIN! GAGO! WALANG LAMAN!",
            "HOY {name}! PLASTIK ka! FAKE! Walang TOTOO sayo! Puro KUNWARI! SALBAHE! PUTANGINA! Napaka-SAMA ng UGALI mo!",
            "PUTANGINA {name}! Sobrang KAPAL ng MUKHA mo! Walang HIYA! WALANG GALANG! BASTOS! GAGO! KUPAL! WALANG ASAL!",
            "{name} ULOL KA! Napaka-YABANG mo! Akala mo SIKAT ka?! HINDI! Walang NAKAKAKILALA sayo! TANGINA! BOBO! TANGA!",
            "GAGO {name}! Puro ka PASIKAT! FEELINGERO/FEELINGERA! Akala mo CELEBRITY ka?! HINDI! NOBODY ka lang! PUTANGINA! TANGA!",
            "{name} LECHE KA! Sobrang KAPAL ng APOG mo! Walang HIYA! WALANG MODO! Puro ka KAARTEHAN! GAGO! ULOL!",
            "PUTANGINA {name}! Napakasama ng UGALI mo! MASAMA! SAMA ng LOOB! GALIT sa MUNDO! BITTER! GAGO! KUPAL!",
            "HOY {name}! PUTA ka! Walang SILBI! WALANG KWENTA! Puro ka PROBLEMA! REKLAMO! DRAMA! TANGINA! TANGA!",
            "{name} HAYOP KA! Ang PANGIT ng UGALI mo! MASAMA! WALANG MODO! BASTOS! WALANG GALANG! PUTANGINA! GAGO!",
            "TANGINA {name}! Puro ka YABANG! Akala mo MAYAMAN ka?! DUKHA ka nga eh! MAHIRAP! WALANG PERA! GAGO! BOBO!",
            "{name} GAGO! FEELINGERO/FEELINGERA ka! Akala mo PERPEKTO ka?! PANGIT ka nga! BOBO pa! TANGA! PUTANGINA!",
            "ABA {name}! PUTA! Sobrang TAAS ng LIPAD mo! MAYABANG! Feeling mo GWAPO/MAGANDA ka?! PANGIT ka GAGO! ULOL!",
            "PUTANGINA mo {name}! KUPAL ka! Napaka-SUPLADO/SUPLADA mo! MASUNGIT! WALANG NGITI! BITTER! GAGO! TANGA!",
            "{name} LECHE! Puro ka KAPLASTIKAN! PLASTIC! FAKE! Walang TUNAY sayo! SALBAHE! TANGINA! KUPAL!",
            "GAGO ka {name}! Walang UTAK! BOBO! Puro ka KALOKOHAN! KATARANTADUHAN! KABOBOHAN! PUTANGINA! TANGA!",
            "HOY {name}! PUTA! Ang YABANG mo! Feeling mo SIKAT ka?! WALANG NAKAKAKILALA sayo! NOBODY! TANGINA! GAGO!",
            "{name} TANGINA MO! Puro ka EPAL! NAKIKISAWSAW! Walang HIYA! KAPAL ng MUKHA! GAGO! ULOL! KUPAL!",
            "PUTANGINA {name}! Napaka-BASTOS mo! WALANG MODO! WALANG GALANG! WALANG RESPETO! GAGO! TANGA! BOBO!",
            "ABA {name}! GAGO! Puro ka HANGIN! Feeling mo MATALINO ka?! BOBO ka nga! TANGA! WALANG ALAM! PUTANGINA!",
            "{name} KUPAL KA! Ang SAMA ng UGALI mo! MASAMA! WALANG MODO! BASTOS! TANGINA! WALANG BREEDING!",
            "GAGO {name}! Napaka-YABANG mo! MAYABANG! Feeling mo SPECIAL ka?! ORDINARY lang! GAGO! PUTANGINA! ULOL!",
            "TANGINA {name}! Puro ka ARTE! Feeling mo STAR ka?! EXTRAS lang! WALANG TALENT! BOBO! GAGO! TANGA!",
            "{name} PUTA! Walang KWENTA ka sa BUHAY! WALANG AMBAG! PARASITE! TAMAD! GAGO! PUTANGINA! KUPAL!",
            "HOY {name}! HAYOP! Ang PANGIT ng UGALI mo! WALANG MODO! BASTOS! WALANG GALANG! TANGINA! GAGO!",
            "PUTANGINA {name}! FEELINGERO/FEELINGERA ka! Akala mo MAYAMAN ka?! DUKHA! WALANG PERA! GAGO! BOBO!",
            "{name} LECHE KA! Puro ka YABANG! MAYABANG! Akala mo PERPEKTO ka?! PURO ka DEPEKTO! TANGINA! TANGA!",
            "GAGO ka {name}! Napaka-PLASTIC mo! FAKE! WALANG TOTOO! Puro KUNWARI! SALBAHE! PUTANGINA! ULOL!",
            "ABA {name}! TANGINA! Ang KAPAL ng MUKHA mo! Walang HIYA! Puro ka KAARTEHAN! GAGO! KUPAL! BOBO!",
            "{name} PUTA KA! Napaka-SUPLADO/SUPLADA mo! MASUNGIT! WALANG NGITI! BITTER sa BUHAY! TANGINA! GAGO!",
            "PUTANGINA {name}! Puro ka SALITA! DADA! Pero WALANG GAWA! PURO ASTA! WALANG SUBSTANCE! GAGO! TANGA!",
            "GAGO {name}! Ang PANGIT mo! PANGET! Feeling mo GWAPO/MAGANDA ka?! HINDI! BOBO ka pa! PUTANGINA! ULOL!",
            "HOY {name}! KUPAL! Walang BREEDING! WALANG MODO! Puro BASTOS! WALANG GALANG! TANGINA! GAGO!",
            "{name} TANGINA! Napaka-DUWAG mo! TAKOT! WALANG BAYAG! Puro ka TAPANG sa SALITA! GAGO! PUTA!",
            "PUTANGINA mo {name}! Puro ka YABANG! Akala mo GALING mo?! BOBO ka nga! TANGA! WALANG ALAM! GAGO!",
            "ABA {name}! LECHE! Ang SAMA ng UGALI mo! WALANG MODO! BASTOS! WALANG RESPETO! TANGINA! KUPAL!",
            "{name} GAGO KA! Napaka-EPAL mo! Lagi kang NAKIKISAWSAW! Walang HIYA! PUTANGINA! WALANG DELICADEZA!",
            "TANGINA {name}! Puro ka DRAMA! KAARTEHAN! PARINIG! Napaka-PLASTIC! FAKE! GAGO! ULOL! KUPAL!",
            "GAGO ka {name}! Feeling mo MAYAMAN ka?! DUKHA ka nga! MAHIRAP! Walang PERA! PUTANGINA! BOBO!",
            "{name} PUTA! Ang PANGIT ng UGALI mo! MASAMA! WALANG MODO! BASTOS! TANGINA! WALANG BREEDING!",
            "HOY {name}! HAYOP KA! Puro ka KAPLASTIKAN! PLASTIC! FAKE! Walang TOTOO! GAGO! PUTANGINA!",
            "PUTANGINA {name}! Napaka-YABANG mo! MAYABANG! Feeling mo SIKAT ka?! WALANG FANS! GAGO! TANGA!",
            "{name} KUPAL! Puro ka HANGIN! WALANG LAMAN! Feeling mo MATALINO?! BOBO ka nga! TANGINA! ULOL!",
            "GAGO {name}! Ang KAPAL ng MUKHA mo! Walang HIYA! WALANG MODO! BASTOS! PUTANGINA! WALANG GALANG!",
            "ABA {name}! TANGINA! Napka-SUPLADO/SUPLADA mo! MASUNGIT! WALANG NGITI! BITTER! GAGO! KUPAL!",
            "{name} LECHE KA! Puro ka YABANG! Akala mo GWAPO/MAGANDA ka?! PANGIT ka GAGO! BOBO! PUTANGINA!",
            "PUTANGINA {name}! Walang KWENTA ka! WALANG SILBI! WALANG AMBAG! PARASITE! GAGO! TANGA! ULOL!",
            "GAGO ka {name}! Napaka-PLASTIC mo! FAKE! Puro KUNWARI! WALANG TOTOO! TANGINA! SALBAHE! KUPAL!",
            "HOY {name}! PUTA! Ang SAMA ng UGALI mo! MASAMA! WALANG MODO! BASTOS! GAGO! PUTANGINA!",
            "{name} TANGINA MO! Puro ka EPAL! Lagi kang NAKIKISAWSAW! KAPAL ng MUKHA! GAGO! ULOL! TANGA!",
            "PUTANGINA {name}! Napaka-DUWAG mo! TAKOT! WALANG BAYAG! Puro TAPANG sa BIBIG! GAGO! BOBO! KUPAL!",
            "ABA {name}! HAYOP! Ang PANGIT mo! PANGET! Feeling mo GANDA/GWAPO ka?! HINDI! TANGINA! GAGO!",
            "{name} GAGO! Puro ka YABANG! MAYABANG! Akala mo PERPEKTO ka?! PURO DEPEKTO! PUTANGINA! TANGA!",
            "TANGINA {name}! Napaka-BASTOS mo! WALANG MODO! WALANG GALANG! WALANG RESPETO! GAGO! ULOL! KUPAL!",
            "GAGO ka {name}! Walang UTAK! BOBO! TANGA! HANGAL! Puro KALOKOHAN! PUTANGINA! WALANG ALAM!",
            "{name} LECHE! Ang KAPAL ng MUKHA mo! Walang HIYA! WALANG MODO! BASTOS! TANGINA! GAGO!",
            "HOY {name}! KUPAL KA! Napaka-SUNGIT mo! MASUNGIT! Walang NGITI! BITTER sa BUHAY! PUTANGINA! GAGO!",
            "PUTANGINA mo {name}! Puro ka HANGIN! Feeling mo TALINO ka?! BOBO ka nga! TANGA! GAGO! ULOL!",
            "{name} PUTA! Napaka-PLASTIC mo! FAKE! Walang TOTOO sayo! SALBAHE! TANGINA! KUPAL! GAGO!",
            "GAGO {name}! Ang PANGIT ng UGALI mo! MASAMA! WALANG MODO! BASTOS! PUTANGINA! WALANG BREEDING!",
            "ABA {name}! TANGINA! Puro ka YABANG! Akala mo SIKAT ka?! NOBODY ka lang! GAGO! TANGA! BOBO!",
            "{name} HAYOP KA! Napaka-EPAL mo! Lagi NAKIKISAWSAW! Walang HIYA! PUTANGINA! GAGO! KUPAL!",
            "PUTANGINA {name}! Ang SAMA mo! MASAMA! Walang MODO! WALANG GALANG! BASTOS! TANGINA! GAGO! ULOL!",
            "GAGO ka {name}! Puro ka ARTE! DRAMA! KAARTEHAN! Napaka-PLASTIC! FAKE! PUTANGINA! TANGA! KUPAL!",
            "HOY {name}! LECHE! Napaka-DUWAG mo! TAKOT! Walang BAYAG! Puro TAPANG sa BIBIG! TANGINA! GAGO!",
            "{name} TANGINA! Ang YABANG mo! MAYABANG! Feeling mo GALING mo?! WALA! BOBO ka! PUTANGINA! TANGA!",
            "PUTANGINA mo {name}! Walang KWENTA! WALANG SILBI! WALANG AMBAG sa LIPUNAN! PARASITE! GAGO! ULOL! KUPAL!",
            "GAGO {name}! Napaka-BASTOS mo! WALANG MODO! WALANG GALANG! WALANG RESPETO! TANGINA! TANGA! BOBO!",
            "{name} PUTA KA! Ang PANGIT mo! PANGET! Feeling mo GWAPO/MAGANDA?! HINDI! BOBO ka pa! TANGINA! GAGO!",
            "ABA {name}! KUPAL! Puro ka YABANG! Akala mo PERPEKTO ka?! PURO DEPEKTO! PUTANGINA! GAGO! ULOL!",
            "TANGINA {name}! Napaka-PLASTIC mo! FAKE! WALANG TOTOO! Puro KUNWARI! SALBAHE! GAGO! TANGA! KUPAL!",
            "HOY {name}! HAYOP! Ang KAPAL ng MUKHA mo! Walang HIYA! WALANG MODO! PUTANGINA! GAGO! BOBO!",
            "{name} GAGO KA! Puro ka EPAL! Lagi NAKIKISAWSAW! KAPAL ng APOG! TANGINA! ULOL! KUPAL! TANGA!",
            "PUTANGINA {name}! Napaka-SUNGIT mo! MASUNGIT! Walang NGITI! BITTER! GAGO! TANGINA! WALANG BUHAY!"
        ];

        const mentions = [{
            tag: targetName,
            id: targetID
        }];

        await api.sendMessage({
            body: `Target: ${targetName}`,
            mentions: mentions
        }, event.threadID);

        for (let i = 0; i < allRants.length; i++) {
            await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 1000) + 1000)); // Random 1-2 second delay

            const message = allRants[i].replace(/\{name}/g, targetName);

            await api.sendMessage({
                body: `[${i + 1}/100] ${message}`,
                mentions: mentions
            }, event.threadID);
        }

        await api.sendMessage({
            body: `Tanginamo ${targetName} muka kang burat HAHAHAHAHA 😆`,
            mentions: mentions
        }, event.threadID);

    } catch (e) {
        console.log(e);
        return api.sendMessage("❌ Error executing war command!", event.threadID, event.messageID);
    }
};
