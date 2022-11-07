import { GameClientDriver, normalUser } from "sc-game-service-integration-utils";
import { socketOptions } from "./stubs/test-data";
import { initUserSession } from "./init-user-session";

export const signinTest = () => {
    describe("signin", () => {
        it("should receive signed in response", async () => {
            // Arrange
            const normalUserClientDriver = new GameClientDriver(socketOptions, initUserSession(normalUser));

            // Act
            await normalUserClientDriver.handleSignedInEvent();

            //Assert
            normalUserClientDriver.close();
        });
    });
};
