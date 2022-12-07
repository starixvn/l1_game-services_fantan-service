import RoundResultPublisher from "../../../src/publishers/round-result-publisher";
import Chance from "chance";

const chance = new Chance();

describe("RoundResultPublisher", () => {
    describe("publishWinners", () => {
        it("should call publishToAllUsers", () => {
            // Arrange
            const roundId = chance.natural();
            const winningPlayers = {};
            const publisher = new RoundResultPublisher();
            publisher.publishToAllUsers = jest.fn();

            // Act
            publisher.publishWinners(roundId, winningPlayers);

            // Assert
            expect(publisher.publishToAllUsers).toBeCalledWith({
                winners: {
                    roundId,
                    winningPlayers,
                },
            });
        });
    });
});
