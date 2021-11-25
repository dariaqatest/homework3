describe.skip("Empty", function () {
    it('empty1', async function () {      
        // Arrange
        await browser.url('https://viktor-silakov.github.io/course-sut');

        // Act
        await $('#login').setValue('walker@jw.com');
        await $('#password').setValue('password');
        await $('button').click();
        await $('#spinner').waitForDisplayed({ reverse: true, timeout: 20000 });

        // Assert
        
        throw new Error(`Have no time`)
    })
})
