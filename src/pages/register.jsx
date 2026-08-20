import { Form } from "@base-ui/react/form";
import { Toggle } from "@base-ui/react/toggle";
import IconVisibilityOff from "@iconify-react/material-symbols/visibility-off-outline-rounded";
import IconVisibility from "@iconify-react/material-symbols/visibility-outline-rounded";
import IconGoogle from "@iconify-react/simple-icons/google";
import { useState } from "react";
import { Navigate } from "react-router";

import { Button } from "#/components/ui/button.jsx";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	CardFooter,
} from "#/components/ui/card.jsx";
import { LabeledDivider } from "#/components/ui/divider.jsx";
import {
	FieldControl,
	FieldError,
	FieldLabel,
	FieldRoot,
} from "#/components/ui/field.jsx";
import { selectIsAuthenticated, useRegisterMutation } from "#/features/auth.js";
import { useAppSelector } from "#/store.js";

/** @param {{ open: boolean }} props */
function EyeIcon({ open }) {
	return open ? (
		<IconVisibility className="size-[1.5em]" />
	) : (
		<IconVisibilityOff className="size-[1.5em]" />
	);
}

export const handle = { header: false };

function Page() {
	const [visible, setVisible] = useState(false);
	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	const [register, { isLoading, error }] = useRegisterMutation();

	/** @param {{ email: string, password: string }} values */
	function submit(values) {
		void register({ email: values.email, password: values.password });
	}

	if (isAuthenticated) {
		return (
			<Navigate
				to="/"
				replace
			/>
		);
	}

	return (
		<div className="h-full grid place-items-center">
			<div className="flex flex-col gap-6 w-full max-w-sm [&_a]:font-medium [&_a]:text-accent [&_a]:underline-offset-4 [&_a]:hover:underline">
				<p className="text-center text-2xl font-black tracking-tight text-ink">
					ShortLink
				</p>
				<Card>
					<CardHeader>
						<CardTitle>Welcome</CardTitle>
						<CardDescription>Enter your details to sign up.</CardDescription>
					</CardHeader>
					<CardContent>
						<Form
							className="flex flex-col gap-5"
							errors={
								error && "error" in error ? { email: error.error } : undefined
							}
							onFormSubmit={submit}
						>
							<FieldRoot name="email">
								<FieldLabel>Email address</FieldLabel>
								<FieldControl
									type="email"
									autoComplete="email"
									required
									placeholder="name@company.com"
								/>
								<FieldError match="valueMissing">Enter your email</FieldError>
								<FieldError />
							</FieldRoot>
							<FieldRoot name="password">
								<FieldLabel>Password</FieldLabel>
								<FieldControl
									type={visible ? "text" : "password"}
									autoComplete="new-password"
									required
									placeholder="••••••••"
									trailing={
										<Toggle
											pressed={visible}
											onPressedChange={setVisible}
											aria-label={visible ? "Hide password" : "Show password"}
											className="flex size-8 items-center justify-center rounded-control text-ink-subtle transition hover:text-ink-muted focus-visible:focus-ring"
										>
											<EyeIcon open={visible} />
										</Toggle>
									}
								/>
								<FieldError match="valueMissing">
									Enter your password
								</FieldError>
							</FieldRoot>
							<FieldRoot
								name="password-confirm"
								validate={(value, formValues) =>
									value === formValues["password"]
										? null
										: "Password does not match"
								}
							>
								<FieldLabel>Confirm Password</FieldLabel>
								<FieldControl
									type={visible ? "text" : "password"}
									autoComplete="new-password"
									required
									placeholder="••••••••"
									trailing={
										<Toggle
											pressed={visible}
											onPressedChange={setVisible}
											aria-label={visible ? "Hide password" : "Show password"}
											className="flex size-8 items-center justify-center rounded-control text-ink-subtle transition hover:text-ink-muted focus-visible:focus-ring"
										>
											<EyeIcon open={visible} />
										</Toggle>
									}
								/>
								<FieldError match="valueMissing">
									Enter your password
								</FieldError>
								<FieldError match="customError" />
							</FieldRoot>
							<Button
								type="submit"
								size="lg"
								className="w-full"
								disabled={isLoading}
							>
								Sign Up
							</Button>
							<LabeledDivider>or continue with</LabeledDivider>
							<Button
								variant="secondary"
								size="lg"
								className="w-full"
							>
								<IconGoogle className="size-[1em]" />
								Google
							</Button>
						</Form>
					</CardContent>
					<CardFooter>
						<small className="text-center">
							By proceeding, you agree to our <a href="">Terms of Service</a>{" "}
							and <a href="">Privacy Policy</a>.
						</small>
					</CardFooter>
				</Card>

				<p className="text-center text-sm text-ink-muted">
					Already have an account? <a href="/login">Sign in</a>
				</p>
			</div>
		</div>
	);
}

export default Page;
