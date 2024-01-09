import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !")
    });
  });

});


// describe("When a page is created", () => {
//   it("a list of events is displayed", () => {
//     // to implement
//   })
//   it("a list a people is displayed", () => {
//     // to implement
//   })
//   it("a footer is displayed", () => {
//     // to implement
//   })
//   it("an event card, with the last event, is displayed", () => {
//     // to implement
//   })
// });

describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    render(<Home />);
    const eventList = screen.findByTestId("testEventList");
    expect(eventList).toBeDefined();
  })
  it("a list a people is displayed", () => {
    render(<Home />);
    const peopleList = screen.findByTestId("testPeopleList");
    expect(peopleList).toBeDefined();
  })
  it("a footer is displayed", () => {
    render(<Home />);
    const footerTest = screen.findByTestId("testFooter");
    expect(footerTest).toBeDefined();
  })
  it("an event card, with the last event, is displayed", () => {
    render(<Home />);
    const lastEvent = screen.findByTestId("testLastEvent");
    expect(lastEvent).toBeDefined();
  })
});