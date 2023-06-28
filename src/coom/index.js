class WindowSandbox {
    constructor() {
        this.sandboxWindow = new Proxy({}, {
            get: (target, property) => {
                if (property === 'alert') {
                    return (...args) => {
                        console.log('Sandboxed alert:', ...args);
                    };
                }
                // 可以根据需要添加其他 window 对象的方法或属性
            },
            set: (target, property, value) => {
                console.log('Blocked attempt to set window property:', property);
            },
            // 可以根据需要添加其他 trap
        });
    }

    getWindow() {
        return this.sandboxWindow;
    }
}

export default WindowSandbox
