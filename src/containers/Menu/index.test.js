import { fireEvent, render, screen } from "@testing-library/react";
import Menu from "./index";

describe("When Menu is created", () => {
  it("a list of mandatories links and the logo are displayed", async () => {
    render(<Menu />);
    await screen.findByText("Nos services");
    await screen.findByText("Nos réalisations");
    await screen.findByText("Notre équipe");
    await screen.findByText("Contact");
  });

  describe("and a click is triggered on contact button", () => {
    it("document location  href change", async () => {
      render(<Menu />);
      fireEvent(
        await screen.findByText("Contact"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      expect(window.document.location.hash).toEqual("#contact");
    });
  });
});


// Ajout d'un test fonctionnel

describe("Menu", () => {
  it("should redirect to '#contact' upon clicking the 'Contact' button", () => {
    const { getByText } = render(<Menu />
    );
    // Simule un click sur le bouton contact
    fireEvent.click(getByText(/Contact/i));


    // Verifie sa redirection
    expect(window.location.hash).toEqual("#contact");

  })

})

