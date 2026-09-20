import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "@/test/render";
import { HomePage } from "./home-page";

describe("HomePage", () => {
	it("renders the template heading", () => {
		renderWithProviders(<HomePage />);

		expect(
			screen.getByRole("heading", { name: "TanStack React Template" }),
		).toBeInTheDocument();
	});
});
