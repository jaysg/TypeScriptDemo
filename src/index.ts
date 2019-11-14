import axios, { AxiosResponse } from "axios";
import colors from "colors";
import commander from "commander";
import readline from "readline";
// const log = console.log;
const log = (str: string) => {
    const logStr = str;
};

const command = commander
    .version("0.1.0")
    .option("-c, --city [name]", "Add city name")
    .parse(process.argv);

if (process.argv.slice(2).length === 0) {
    command.outputHelp(colors.red);
    process.exit();
}

async function getWeather(city: string) {
    const URL = "https://restapi.amap.com/v3/weather/weatherInfo";
    const KEY = "d023af169b6b874ffc808299b1d8aa92";
    axios.get(`${URL}?city=${encodeURI(command.city)}&key=${KEY}`).then((res: AxiosResponse<IWeatherResponse>) => {
        if (res.data.status === "1") {
            if (res.data.lives.length) {
                const live = res.data.lives[0];
                log(colors.yellow(live.reporttime));
                log(colors.white(`${live.province} ${live.city}`));
                log(colors.green(`${live.weather} ${live.temperature} 度`));
                log("----------------------------------");
            } else {
                log(colors.yellow(`[Warnning]:未查询到城市天气信息`));
                clearInterval(timer);
                rl.close();
            }
        } else {
            log(colors.red(`[Error]:infocode[${res.data.infocode}]`));
        }
    }).catch((err) => {
        log(err);
    });
}

log(colors.green(`[Info]:输入Y停止请求`));
const rl = readline.createInterface(process.stdin, process.stdout);
rl.on("line", (line) => {
    if (line.trim() === "y" || line.trim() === "Y") {
        clearInterval(timer);
        rl.close();
    }
});
rl.on("close", () => {
    log(colors.green(`[Info]:成功停止请求`));
});

log(colors.green(`[Info]:2s 请求一次天气`));
let postTimes = 0; // 请求次数
const timer = setInterval(() => {
    getWeather(command.city);
    log(colors.green(`[Info]:当前请求第${postTimes + 1}次`));
    postTimes++;
}, 2000);

interface IWeatherResponse {
    status: string;
    count: string;
    info: string;
    infocode: string;
    lives: ILive[];
}

interface ILive {
    province: string;
    city: string;
    adcode: string;
    weather: string;
    temperature: string;
    winddirection: string;
    windpower: string;
    humidity: string;
    reporttime: string;
}
