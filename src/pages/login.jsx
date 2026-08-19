import { Form } from "@base-ui/react/form";
import { Toggle } from "@base-ui/react/toggle";
import IconGoogle from "@iconify-react/simple-icons/google";
import { useState } from "react";

import { Button } from "#/components/ui/button.jsx";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "#/components/ui/card.jsx";
import { LabeledDivider } from "#/components/ui/divider.jsx";
import {
	FieldControl,
	FieldError,
	FieldLabel,
	FieldRoot,
} from "#/components/ui/field.jsx";

/** @param {{ open: boolean }} props */
function EyeIcon({ open }) {
	return (
		<svg
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.75"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden
		>
			<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
			<circle
				cx="12"
				cy="12"
				r="3"
			/>
			{!open && <path d="m4 4 16 16" />}
		</svg>
	);
}

function Page() {
	const [visible, setVisible] = useState(false);

	return (
		<div className="h-full grid place-items-center">
			<div className="flex flex-col gap-6 w-full max-w-sm">
				<p className="text-center text-2xl font-black tracking-tight text-ink">
					ShortLink
				</p>
				<Card>
					<CardHeader>
						<CardTitle>Welcome back</CardTitle>
						<CardDescription>Enter your details to sign in.</CardDescription>
					</CardHeader>
					<CardContent>
						<Form className="flex flex-col gap-5">
							<FieldRoot name="email">
								<FieldLabel>Email address</FieldLabel>
								<FieldControl
									type="email"
									required
									placeholder="name@company.com"
								/>
								<FieldError match="valueMissing">
									Enter the email you signed up with.
								</FieldError>
							</FieldRoot>
							<FieldRoot name="password">
								<div className="flex items-baseline justify-between">
									<FieldLabel>Password</FieldLabel>
									<a
										href="/reset"
										className="text-xs font-medium text-accent underline-offset-4 hover:underline"
									>
										Forgot password?
									</a>
								</div>
								<FieldControl
									type={visible ? "text" : "password"}
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
							</FieldRoot>
							<Button
								type="submit"
								size="lg"
								className="w-full"
							>
								Sign in
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
				</Card>
				<p className="text-center text-sm text-ink-muted">
					Don&rsquo;t have an account?{" "}
					<a
						href="/register"
						className="font-semibold text-accent underline-offset-4 hover:underline"
					>
						Sign up
					</a>
				</p>
			</div>
		</div>
	);
}

export default Page;
