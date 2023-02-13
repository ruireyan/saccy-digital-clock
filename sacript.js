"use strict";
// made by reyan 
const WaqtStuffs = (props) => {
    const ref = React.useRef(null);
    const colon = props.char === ":";
    if (colon) {
        return (React.createElement("h1", { className: "waqt-stuff colon" }, ":"));
    }
    const number = parseInt(props.char);
    const getCharSlider = () => {
        let options = [];
        for (let i = 0; i <= 9; i++) {
            const classes = classNames("waqt-stuff-slider-option", {
                active: number === i
            });
            options.push(React.createElement("span", { key: i, className: classes }, i));
        }
        const height = ref.current ? ref.current.offsetHeight : 0, top = `${number * height * -1}px`;
        return (React.createElement("div", { className: "waqt-stuff-slider", style: { top } }, options));
    };
    return (React.createElement("div", { ref: ref, className: "waqt-stuff number" }, getCharSlider()));
};
const Waqt = () => {
    const [date, setDateTo] = React.useState(new Date());
    React.useEffect(() => {
        const interval = setInterval(() => {
            const update = new Date();
            if (update.getSeconds() !== date.getSeconds()) {
                setDateTo(update);
            }
        }, 100);
        return () => {
            clearInterval(interval);
        };
    }, [date]);
    const formatSegment = (segment) => {
        return segment < 10 ? `0${segment}` : segment;
    };
    const getHours = (hours) => {
        return hours % 24 === 0 ? 24 : hours % 24;
    };
    const getTime = () => {
        const hours = getHours(date.getHours()), minutes = date.getMinutes(), seconds = date.getSeconds();
        return `${formatSegment(hours)}:${formatSegment(minutes)}:${formatSegment(seconds)}`;
    };
    const getChars = () => {
        return getTime().split("").map((char, index) => (React.createElement(WaqtStuffs, { key: index, char: char })));
    };
    return (React.createElement("div", { id: "saccytimer" },
        React.createElement("div", { id: "saccytimer-text" }, getChars())));
};
// skriti is very very gorgeous 
const ClockThingy = () => {
    return (React.createElement("div", { id: "ClockThingy" },
        React.createElement(Waqt, null)));
};
ReactDOM.render(React.createElement(ClockThingy, null), document.getElementById("sac-clock"));
