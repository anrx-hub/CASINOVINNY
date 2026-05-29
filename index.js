const { Client, GatewayIntentBits, ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

// تشغيل البوت عبر متغيرات البيئة لحمايته من السرقة
const TOKEN = process.env.DISCORD_TOKEN; 

client.once('ready', () => {
    console.log(`✅ البوت جاهز ويعمل الآن باسم: ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.content.startsWith('!')) return;

    const args = message.content.slice(1).trim().split(/+/);
    const command = args.shift().toLowerCase();

    if (command === 'casino' || command === 'العاب') {
        const embed = new EmbedBuilder()
            .setColor('#1a1a1a')
            .setTitle('🔽 اختر اللعبة')
            .setDescription('مرحباً بك في كازينو البوت! اختر اللعبة التي تريد لعبها من القائمة أدناه:');

        const menu = new StringSelectMenuBuilder()
            .setCustomId('casino_menu')
            .setPlaceholder('اضغط هنا لاختيار اللعبة...')
            .addOptions([
                { label: 'البحث عن الكرة', description: 'حاول العثور على الكرة داخل أحد الأكواب', value: 'cups', emoji: '🥎' },
                { label: 'لعبة النرد', description: 'رمي النرد ومحاولة تحقيق الفوز', value: 'dice', emoji: '🎲' },
                { label: 'عجلة الحظ', description: 'اختر لوناً ودع العجلة تحدد مصيرك!', value: 'wheel', emoji: '🎡' },
                { label: 'اكس او', description: 'xo', value: 'tic_tac_toe', emoji: '❌' },
                { label: 'بلاك جاك', description: 'العب بلاك جاك ضد البوت', value: 'blackjack', emoji: '🃏' },
                { label: 'قلب العمله', description: 'العب كوين فليب ضد البوت', value: 'coin_flip', emoji: '🪙' },
                { label: 'حجر ورق مقص', description: 'العب حجر ورق مقص ضد البوت', value: 'rps', emoji: '✂️' },
                { label: 'سباق الأحصنة', description: 'راهن على حصانك من 5 أحصنة واربح x3!', value: 'horse_race', emoji: '🐎' },
                { label: 'الأبراج', description: 'تسلق البرج واختر الأزرار الصحيحة', value: 'towers', emoji: '🗼' },
                { label: 'الحد التقريبي ضد البوت', description: 'تحدي البوت في الحد التقريبي (إظهار أرقام)', value: 'higher_lower', emoji: '🔢' },
                { label: 'إلغاء التحدي', description: 'قم بإلغاء التحدي الحالي.', value: 'cancel', emoji: '🚫' }
            ]);

        const row = new ActionRowBuilder().addComponents(menu);
        await message.reply({ embeds: [embed], components: [row] });
    }
});

client.login(TOKEN);
