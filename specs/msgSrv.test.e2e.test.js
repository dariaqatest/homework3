const {
    startClientPC,
    startSatelite,
    stopClientPC,
    stopEarthServer,
    stopSatelite,
    stopMarsServer,
    startEarthServer,
    startMarsServer,
    sendMessage,
    assertResponse
} = require('./stubs/messageservice.stubs');

function startAllNodes() {
    startClientPC();
    const earthToken = startEarthServer();
    const marsToken = startMarsServer();
    startSatelite();
    return {
        earth: earthToken,
        mars: marsToken,
    }
}

function stopAllNodes(){
    stopMarsServer();
    stopEarthServer();
    stopSatelite();
    stopClientPC();
}

describe('communication with Earth should work', function () {

    // Успешная отправка сообщений на сервер Земли - OK
    it('send message to Earth without error', function () {
        // Arrange
        let tokens = startAllNodes();

        // Act
        const response = sendMessage('Hello', 'Earth', tokens.earth);

        // Assert
        assertResponse(response, 'Success');

        // Dispose
        stopAllNodes()
    });

    // Отправка сообщений на сервер Земли с невалидным токеном - OK
    it('send message to Earth with "Security Error"', function () {
        // Arrange
        startAllNodes();

        // Act
        const response = sendMessage('Hello', 'Earth', 'X0000');

        // Assert
        assertResponse(response, 'Security Error');

        // Dispose
        stopAllNodes()
    });

})

describe('communication with Mars should work', function () {

    // Успешная отправка сообщений на сервер Марса - OK
    it('send message to Mars without error', function () {
        // Arrange
        let tokens = startAllNodes();

        // Act
        const response = sendMessage('Hello', 'Mars', tokens.mars);

        // Assert
        assertResponse(response, 'Success');

        // Dispose
        stopAllNodes()
    });

    // Отправка сообщений на сервер Марса с невалидным токеном - OK
    it('send message to Mars with invalid token with "Security Error"', function () {
        // Arrange
        startAllNodes();

        // Act
        const response = sendMessage('Hello', 'Mars', 'X0000');

        // Assert
        assertResponse(response, 'Security Error');

        // Dispose
        stopAllNodes()
    });

    // Отправка сообщений на сервер Марса с валидным токеном и отключенным спутником - OK
    it('send message to Mars with valid token and stoped satelite and with "Service is unavailable"', function () {
        // Arrange
        let tokens = startAllNodes();

        // Act
        stopSatelite();
        const response = sendMessage('Hello', 'Mars', tokens.mars);

        // Assert
        assertResponse(response, 'Service is unavailable');

        // Dispose
        stopAllNodes()
    });

    // Отправка сообщений на сервер Марса с невалидным токеном и отключенным спутником - OK
    it('send message to Mars with invalid token and stoped satelite and with "Service is unavailable"', function () {
        // Arrange
        startAllNodes();

        // Act
        stopSatelite();
        const response = sendMessage('Hello', 'Mars', 'X0000');

        // Assert
        assertResponse(response, 'Service is unavailable');

        // Dispose
        stopAllNodes()
    });

})
