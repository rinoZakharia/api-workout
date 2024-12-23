// models/seed.js

const { sequelize, Exercise } = require('./index');

const seedExercises = async () => {
    try {
        const exercisesData = [
            {
                name: 'Bench Press',
                equipment: 'Barbell',
                muscle: 'Chest, Tricep, Shoulders',
                image: 'https://gymvisual.com/img/p/2/9/0/5/8/29058.gif',
                how: 'Berbaringlah di bangku datar dengan kaki di tanah. Pegang barbell dengan tangan selebar bahu. Turunkan barbell ke dada, kemudian dorong kembali ke posisi awal.',
            },
            {
                name: 'Bench Press',
                equipment: 'Dumbbell',
                muscle: 'Chest, Tricep, Shoulders',
                image: 'https://gymvisual.com/img/p/5/0/2/2/5022.gif',
                how: 'Berbaringlah di bangku datar dengan kaki di tanah. Pegang dumbbell di masing-masing tangan dengan posisi lengan lurus di atas dada. Turunkan dumbbell ke samping dada, kemudian dorong kembali ke posisi awal.',
            },
            {
                name: 'Chest Fly',
                equipment: 'Dumbbell',
                muscle: 'Chest, Shoulders',
                image: 'https://gymvisual.com/img/p/2/1/5/4/1/21541.gif',
                how: 'Berbaringlah di bangku datar dengan dumbbell di tangan. Angkat lengan ke atas dengan sedikit tekuk di siku. Buka lengan ke samping hingga dada terasa terentang, kemudian kembali ke posisi awal.',
            },
            {
                name: 'Chest Fly',
                equipment: 'Cable',
                muscle: 'Chest, Shoulders',
                image: 'https://gymvisual.com/img/p/3/2/6/3/9/32639.gif',
                how: 'Atur kabel di mesin ke posisi atas. Pegang pegangan dengan kedua tangan dan tarik kedua tangan ke depan hingga tangan bertemu di tengah. Kembali perlahan ke posisi awal.',
            },
            {
                name: 'Push Up',
                equipment: 'None',
                muscle: 'Chest, Tricep, Shoulders',
                image: 'https://gymvisual.com/img/p/2/4/5/5/5/24555.gif',
                how: 'Mulailah dalam posisi plank dengan tangan sedikit lebih lebar dari bahu. Turunkan tubuh hingga dada hampir menyentuh lantai. Dorong kembali ke posisi awal.',
            },
            {
                name: 'Deadlift',
                equipment: 'Barbell',
                muscle: 'Back, Legs, Forearm',
                image: 'https://gymvisual.com/img/p/3/1/8/4/3/31843.gif',
                how: 'Berdiri dengan kaki selebar bahu dan barbell di depan. Tekuk lutut dan dorong pinggul ke belakang untuk mengambil barbell. Angkat barbell hingga berdiri tegak, kemudian turunkan kembali ke posisi awal.',
            },
            {
                name: 'Pull Up',
                equipment: 'None',
                muscle: 'Back, Bicep, Forearm',
                image: 'https://gymvisual.com/img/p/7/6/0/2/7602.gif',
                how: 'Gantungkan diri pada bar dengan tangan selebar bahu. Tarik tubuh ke atas hingga dagu melewati bar, kemudian turunkan kembali ke posisi awal.',
            },
            {
                name: 'Bent Over Row',
                equipment: 'Barbell',
                muscle: 'Back, Bicep, Shoulders',
                image: 'https://gymvisual.com/img/p/1/6/9/3/4/16934.gif',
                how: 'Berdiri dengan kaki selebar bahu dan sedikit tekuk lutut. Condongkan tubuh ke depan dengan punggung lurus. Pegang barbell dengan tangan selebar bahu dan tarik ke arah perut, kemudian turunkan kembali.',
            },
            {
                name: 'Bent Over Row',
                equipment: 'Dumbbell',
                muscle: 'Back, Bicep, Shoulders',
                image: 'https://gymvisual.com/img/p/1/0/4/2/1/10421.gif',
                how: 'Berdiri dengan kaki selebar bahu dan sedikit tekuk lutut. Condongkan tubuh ke depan dengan punggung lurus. Pegang dumbbell di masing-masing tangan dan tarik ke arah perut, kemudian turunkan kembali.',
            },
            {
                name: 'Shoulder Press',
                equipment: 'Barbell',
                muscle: 'Shoulders, Tricep',
                image: 'https://gymvisual.com/img/p/2/4/9/5/0/24950.gif',
                how: 'Duduk atau berdiri dengan barbell di atas bahu. Dorong barbell ke atas hingga lengan lurus, kemudian turunkan kembali ke posisi awal.',
            },
            {
                name: 'Shoulder Press',
                equipment: 'Dumbbell',
                muscle: 'Shoulders, Tricep',
                image: 'https://gymvisual.com/img/p/2/4/9/5/0/24950.gif',
                how: 'Duduk atau berdiri dengan dumbbell di masing-masing tangan di bahu. Dorong dumbbell ke atas hingga lengan lurus, kemudian turunkan kembali ke posisi awal.',
            },
            {
                name: 'Lateral Raise',
                equipment: 'Dumbbell',
                muscle: 'Shoulders',
                image: 'https://gymvisual.com/img/p/2/4/9/6/0/24960.gif',
                how: 'Berdiri dengan dumbbell di masing-masing tangan di sisi tubuh. Angkat lengan ke samping hingga sejajar dengan lantai, kemudian turunkan kembali ke posisi awal.',
            },
            {
                name: 'Front Raise',
                equipment: 'Dumbbell',
                muscle: 'Shoulders',
                image: 'https://gymvisual.com/img/p/2/1/6/0/8/21608.gif',
                how: 'Berdiri dengan dumbbell di masing-masing tangan di depan paha. Angkat lengan lurus ke depan hingga sejajar dengan lantai, kemudian turunkan kembali ke posisi awal.',
            },
            {
                name: 'Biceps Curl',
                equipment: 'Dumbbell',
                muscle: 'Bicep, Forearm',
                image: 'https://gymvisual.com/img/p/2/0/9/5/4/20954.gif',
                how: 'Berdiri dengan dumbbell di masing-masing tangan, telapak tangan menghadap ke depan. Angkat dumbbell ke arah bahu dengan menekuk siku, kemudian turunkan kembali ke posisi awal.',
            },
            {
                name: 'Biceps Curl',
                equipment: 'Barbell',
                muscle: 'Bicep, Forearm',
                image: 'https://gymvisual.com/img/p/1/0/0/9/4/10094.gif',
                how: 'Berdiri dengan kaki selebar bahu dan pegang barbell dengan tangan selebar bahu. Angkat barbell ke arah bahu dengan menekuk siku, kemudian turunkan kembali ke posisi awal.',
            },
            {
                name: 'Triceps Extension',
                equipment: 'Dumbbell',
                muscle: 'Tricep, Shoulders',
                image: 'https://gymvisual.com/img/p/2/7/3/4/2/27342.gif',
                how: 'Duduk atau berdiri dengan dumbbell di tangan. Angkat dumbbell ke atas kepala dengan lengan lurus, kemudian tekuk siku untuk menurunkan dumbbell di belakang kepala. Luruskan kembali lengan.',
            },
            {
                name: 'Triceps Extension',
                equipment: 'Cable',
                muscle: 'Tricep, Shoulders',
                image: 'https://gymvisual.com/img/p/2/6/3/0/7/26307.gif',
                how: 'Pegang pegangan kabel dengan kedua tangan. Dorong pegangan ke bawah hingga lengan lurus, kemudian tarik kembali ke posisi awal dengan menekuk siku.',
            },
            {
                name: 'Squat',
                equipment: 'Barbell',
                muscle: 'Legs, Glutes, Lower Back',
                image: 'https://gymvisual.com/img/p/2/4/9/6/4/24964.gif',
                how: 'Berdiri dengan kaki selebar bahu dan barbell di punggung. Turunkan tubuh dengan menekuk lutut dan pinggul seolah duduk di kursi, kemudian dorong kembali ke posisi berdiri.',
            },
            {
                name: 'Squat',
                equipment: 'Dumbbell',
                muscle: 'Legs, Glutes, Lower Back',
                image: 'https://gymvisual.com/img/p/3/6/6/9/4/36694.gif',
                how: 'Berdiri dengan kaki selebar bahu dan pegang dumbbell di sisi tubuh atau di bahu. Turunkan tubuh dengan menekuk lutut dan pinggul, kemudian dorong kembali ke posisi berdiri.',
            },
            {
                name: 'Bulgarian Split Squat',
                equipment: 'Dumbbell',
                muscle: 'Legs, Glutes, Hamstrings',
                image: 'https://gymvisual.com/img/p/2/1/6/9/2/21692.gif',
                how: 'Berdiri dengan satu kaki di depan dan kaki lainnya di atas bangku di belakang. Turunkan tubuh dengan menekuk lutut depan hingga paha sejajar dengan lantai, kemudian dorong kembali ke posisi awal. Ulangi dengan kaki lainnya.',
            },
            {
                name: 'Sled Push',
                equipment: 'Sled',
                muscle: 'Full Body, Legs, Core, Shoulders',
                image: 'https://gymvisual.com/img/p/1/0/6/8/0/10680.gif',
                how: 'Pegang tali sled dan dorong sled ke depan sejauh yang ditentukan dengan langkah pendek dan cepat, sambil menjaga tubuh tegak dan perut kencang.',
            },
            {
                name: 'Sled Pull',
                equipment: 'Sled',
                muscle: 'Full Body, Legs, Core, Back',
                image: 'https://gymvisual.com/img/p/1/0/7/3/6/10736.gif',
                how: 'Pasang tali pada sled dan tarik sled ke arah yang ditentukan dengan langkah kuat dan stabil, menjaga tubuh tetap tegak dan punggung lurus.',
            },
            {
                name: 'Jump Squat',
                equipment: 'None',
                muscle: 'Legs, Glutes, Cardio',
                image: 'https://gymvisual.com/img/p/1/8/5/9/9/18599.gif',
                how: 'Berdiri dengan kaki selebar bahu. Turunkan tubuh ke posisi squat, kemudian lompat ke udara dengan tenaga penuh. Mendarat kembali ke posisi squat dan ulangi.',
            },
            {
                name: 'Plyometric Push-Up',
                equipment: 'None',
                muscle: 'Chest, Tricep, Shoulders, Core',
                image: 'https://gymvisual.com/img/p/9/1/0/1/9101.gif',
                how: 'Mulailah dalam posisi push-up. Dorong tubuh ke atas dengan tenaga penuh sehingga tangan terangkat dari lantai, kemudian mendarat kembali ke posisi push-up dan ulangi.',
            },
            {
                name: 'Bear Crawl',
                equipment: 'None',
                muscle: 'Full Body, Core, Shoulders, Legs',
                image: 'https://gymvisual.com/img/p/1/3/6/7/8/13678.gif',
                how: 'Mulailah dalam posisi merangkak dengan lutut sedikit diangkat dari lantai. Gerakkan tangan dan kaki secara bergantian maju sejauh yang ditentukan.',
            },
            {
                name: 'Medicine Ball Chest Pass',
                equipment: 'Medicine Ball',
                muscle: 'Chest, Shoulders, Tricep',
                image: 'https://gymvisual.com/img/p/6/5/6/9/6569.gif',
                how: 'Berdiri menghadap ke depan dengan medicine ball di dada. Dorong medicine ball ke depan dengan tenaga penuh hingga tangan lurus, kemudian tangkap kembali dan ulangi.',
            },
            {
                name: 'Battle Rope Alternating Waves',
                equipment: 'Battle Ropes',
                muscle: 'Arms, Shoulders, Core, Cardio',
                image: 'https://gymvisual.com/img/p/1/8/6/1/2/18612.gif',
                how: 'Pegang ujung battle ropes di masing-masing tangan. Buat gelombang bergantian dengan menggerakkan lengan ke atas dan ke bawah secara bergantian dengan cepat.',
            },
            {
                name: 'Single-Arm Kettlebell Swing',
                equipment: 'Kettlebell',
                muscle: 'Full Body, Glutes, Hamstrings, Shoulders',
                image: 'https://gymvisual.com/img/p/1/9/1/6/3/19163.gif',
                how: 'Pegang kettlebell dengan satu tangan di antara kaki. Ayunkan kettlebell ke antara kaki dengan menekuk lutut sedikit, kemudian ayunkan ke depan setinggi dada dengan menggerakkan pinggul ke depan dan luruskan tubuh. Ulangi dan ganti tangan.',
            },
            {
                name: 'Turkish Get-Up',
                equipment: 'Kettlebell',
                muscle: 'Full Body, Core, Shoulders',
                image: 'https://gymvisual.com/img/p/1/8/5/5/3/18553.gif',
                how: 'Berbaring telentang dengan kettlebell di satu tangan, lengan lurus ke atas. Bangkit ke posisi berdiri dengan menjaga kettlebell tetap di atas tangan, lalu kembali ke posisi awal dengan kontrol.',
            },
        ];

        module.exports = exercisesData;


        await sequelize.sync();

        const count = await Exercise.count();
        if (count === 0) {
            await Exercise.bulkCreate(exercisesData);
            console.log('Seeder berhasil dijalankan: Data exercises telah ditambahkan.');
        } else {
            console.log('Seeder diabaikan: Terdapat data exercises di database.');
        }

        process.exit(0);
    } catch (error) {
        console.error('Gagal menjalankan seeder:', error);
        process.exit(1);
    }
};

seedExercises();
