import React from "react";
import ButtonGroup from "../components/elements/ButtonGroup";
import Button from "../components/elements/Button";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import "../App.css";

const Admin =
	() => {
		return (
			<section
				style={{
					marginTop: 200,
					// backgroundColor:
					// 	"red",
				}}
			>
				<div
					className="container-sm"
					style={
						{
							// backgroundColor:
							// 	"blue",
						}
					}
				>
					<h1
						className="mt-0 mb-16 reveal-from-bottom"
						data-reveal-delay="200"
					>
						<span className="text-color-primary">
							가이드
						</span>
						등록
					</h1>
					<div
						className="container-s"
						style={{
							// backgroundColor:
							// 	"black",
							width:
								"100%",
						}}
					>
						<div
							className="reveal-from-bottom"
							data-reveal-delay="600"
							style={{
								height: 400,
								backgroundColor:
									"white",
							}}
						>
							<CKEditor
								style={{
									height: 400,
									minHeight:
										"500px",
								}}
								editor={
									ClassicEditor
								}
								placeholder="<p>가이드 내용을 입력하세요!</p>"
								onReady={(
									editor
								) => {
									// You can store the "editor" and use when it is needed.
									console.log(
										"Editor is ready to use!",
										editor
									);
								}}
								onChange={(
									event,
									editor
								) => {
									const data =
										editor.getData();
									console.log(
										{
											event,
											editor,
											data,
										}
									);
								}}
								onBlur={(
									event,
									editor
								) => {
									console.log(
										"Blur.",
										editor
									);
								}}
								onFocus={(
									event,
									editor
								) => {
									console.log(
										"Focus.",
										editor
									);
								}}
							/>
						</div>
						<div
							className="reveal-from-bottom"
							data-reveal-delay="600"
							style={{
								marginTop: 50,
								justifyContent:
									"center",
								display:
									"flex",
							}}
						>
							<ButtonGroup>
								<Button
									tag="a"
									color="primary"
									wideMobile
									href="https://cruip.com/"
								>
									등록
								</Button>
								<Button
									tag="a"
									color="dark"
									wideMobile
									href="https://github.com/cruip/open-react-template/"
								>
									초기화
								</Button>
							</ButtonGroup>
						</div>
					</div>
				</div>
			</section>
		);
	};

export default Admin;
