import javafx.application.Application;
import javafx.application.Platform;
import javafx.collections.FXCollections;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.layout.*;
import javafx.scene.text.Text;
import javafx.stage.Stage;
import javafx.stage.StageStyle;

import java.util.ArrayList;
import java.util.Arrays;


public class Display extends Application {

	public static void main(String[] args) {
		launch(args);
	}

	private void showAlert(String title) {
		Alert alert = new Alert(Alert.AlertType.INFORMATION);
		alert.setHeight(450);
		alert.setWidth(400);
		alert.initStyle(StageStyle.UNDECORATED);

		DialogPane dialogPane = alert.getDialogPane();
		BackgroundImage m;
		if(title.equals("The Rules")) {
			m = new BackgroundImage(new Image("rules.png"), BackgroundRepeat.REPEAT, BackgroundRepeat.REPEAT, BackgroundPosition.CENTER, BackgroundSize.DEFAULT);
		} else {
			m = new BackgroundImage(new Image("info.png"), BackgroundRepeat.REPEAT, BackgroundRepeat.REPEAT, BackgroundPosition.CENTER, BackgroundSize.DEFAULT);
		}
		dialogPane.setBackground(new Background(m));
		dialogPane.setPrefWidth(400);
		dialogPane.setHeaderText(null);
		dialogPane.setGraphic(null);

		alert.showAndWait();
	}

	private void gameOver(String[] message, Stage primaryStage, int theme) {
		Alert alert = new Alert(Alert.AlertType.NONE);
		alert.setHeight(460);
		alert.setWidth(400);
		alert.initStyle(StageStyle.UNDECORATED);
		Image cats;
		if (theme == 0) {
			cats = new Image("win1.png");
		} else {
			cats = new Image("win2.jpg");
		}
		BackgroundImage background = new BackgroundImage(cats, BackgroundRepeat.REPEAT, BackgroundRepeat.REPEAT, BackgroundPosition.CENTER, BackgroundSize.DEFAULT);
		DialogPane dialogPane = alert.getDialogPane();
		dialogPane.setBackground(new Background(background));

		Text endTitle = new Text(message[0]);
		endTitle.setStyle("-fx-font-size: 25px; -fx-fill: white; -fx-font-weight: bold; -fx-border-color: black; -fx-border-width: 1px;");
		Text endText = new Text(message[1]);
		endText.setStyle("-fx-font-size: 15px; -fx-fill: white;");
		Text space = new Text("            ");
		space.setStyle("-fx-font-size: 10px;");
		Button playAgain = new Button("Play Again");
		playAgain.setPrefSize(100, 30);
		Button exit = new Button("Exit");
		exit.setPrefSize(100, 30);
		HBox buttons = new HBox(playAgain, space, exit);
		buttons.alignmentProperty().set(Pos.CENTER);
		VBox content = new VBox(endTitle, endText, space, buttons);
		content.setPrefSize(400, 440);
		content.alignmentProperty().set(Pos.BOTTOM_CENTER);
		dialogPane.setContent(content);

		exit.setOnAction(e-> System.exit(0));

		playAgain.setOnAction(e->{
			primaryStage.setScene(gameScene(primaryStage, theme));
			alert.setResult(ButtonType.CANCEL);
			alert.close();
		});


		alert.showAndWait();
	}

	private MenuBar menuBar(Stage primaryStage, int game, int theme) {
		MenuBar menuBar = new MenuBar();
		Menu menu = new Menu("Menu");
		MenuItem rules = new MenuItem("Rules");
		MenuItem odds = new MenuItem("Odds");
		MenuItem exit = new MenuItem("Exit");
		MenuItem newLook;
		if(theme == 0)
			newLook = new MenuItem("New Look");
		else
			newLook = new MenuItem("Old Look");

		menu.getItems().addAll(rules, odds, exit);

		if(game == 1)
			menu.getItems().add(newLook);

		menuBar.getMenus().add(menu);

		rules.setOnAction(e-> showAlert("The Rules"));
		odds.setOnAction(e-> showAlert(" The Odds"));
		exit.setOnAction(e-> System.exit(0));
		newLook.setOnAction(e->{
			if(theme == 0) {
				primaryStage.setScene(gameScene(primaryStage, 1));
			} else {
				primaryStage.setScene(gameScene(primaryStage, 0));
			}
		});

		return menuBar;
	}

	private Scene startScene(Stage primaryStage) {
		//BACKGROUND IMAGE
		Image epic = new Image("mafia-cat-uuzuj4to.jpeg");
		BackgroundImage background = new BackgroundImage(epic, BackgroundRepeat.REPEAT, BackgroundRepeat.REPEAT, BackgroundPosition.CENTER, BackgroundSize.DEFAULT);

		//LOGO
		Image logo = new Image("logo-KENO1.png");
		ImageView topImageView = new ImageView();
		topImageView.setFitHeight(80);
		topImageView.setFitWidth(200);
		topImageView.setImage(logo);

		//MIDDLE CONTENT
		BorderPane startCenterPane = new BorderPane();
		startCenterPane.setPrefSize(500, 500);

		//PLAY BUTTON
		Button playButton = new Button("Play");
		playButton.setPrefSize(300, 50);
		playButton.setOnAction(e-> primaryStage.setScene(gameScene(primaryStage, 0)));

		//START SCENE
		BorderPane borderPane = new BorderPane();
		borderPane.setTop(topImageView);
		borderPane.setCenter(startCenterPane);
		borderPane.setBottom(playButton);
		BorderPane.setAlignment(topImageView, Pos.TOP_CENTER);
		BorderPane.setMargin(topImageView, new javafx.geometry.Insets(10, 0, 0, 0));
		BorderPane.setAlignment(playButton, Pos.BOTTOM_CENTER);
		BorderPane.setMargin(playButton, new javafx.geometry.Insets(0, 0, 30, 0));
		VBox startVBox = new VBox();
		startVBox.setBackground(new Background(background));
		startVBox.getChildren().addAll(menuBar(primaryStage,0, 0), borderPane);

		return new Scene(startVBox, 620, 700);
	}

	private Scene gameScene(Stage primaryStage, int theme) {
		//COLOR THEMES FOR NEW LOOK
		String buttonSelected;
		String buttonUnselected;
		if(theme == 0) {
			buttonSelected = "-fx-background-color: rgb(231,222,81)";
			buttonUnselected = "-fx-background-color: rgba(162,159,85)";
		}
		else {
			buttonSelected = "-fx-background-color: rgb(255,101,194)";
			buttonUnselected = "-fx-background-color: rgb(215,88,156)";
		}

		//KENO GAME OBJECT
		Keno keno = new Keno();
		ArrayList<KenoButton> buttons;

		//BACKGROUND IMAGE
		Image epic; //ik its a stupid name but the pic went hard sorry
		if(theme == 0)
			epic = new Image("mafia-cat-uuzuj4toBLURRED.jpg");
		else
			epic = new Image("heartbackground.jpg");
		BackgroundImage background = new BackgroundImage(epic, BackgroundRepeat.REPEAT, BackgroundRepeat.REPEAT, BackgroundPosition.CENTER, BackgroundSize.DEFAULT);

		//TOP CONTENT
		//logo
		ImageView logo;
		if(theme == 0) {
			logo = new ImageView(new Image("logo-KENO1.png"));
		} else {
			logo = new ImageView(new Image("logo-KENO2.png"));
		}
		logo.setFitHeight(80);
		logo.setFitWidth(200);

		//draws and spots
		Text drawText = new Text("Draws: ");
		drawText.setStyle("-fx-font-size: 20px; -fx-fill: white;");
		Text spotText = new Text("Spots: ");
		spotText.setStyle("-fx-font-size: 20px; -fx-fill: white;");
		Spinner drawSpinner = new Spinner(1,4,1);
		Spinner spotSpinner = new Spinner();
		spotSpinner.setValueFactory(new SpinnerValueFactory.ListSpinnerValueFactory<>(FXCollections.observableArrayList(Arrays.asList(1, 4, 8, 10))));
		drawSpinner.setPrefSize(55, 50);
		spotSpinner.setPrefSize(55, 50);

		//ready button
		Button readyButton = new Button("Ready!");
		readyButton.setPrefSize(70, 50);

		//Top container
		HBox topHBox = new HBox();
		topHBox.setPrefSize(500, 100);
		topHBox.setAlignment(Pos.CENTER);
		topHBox.setSpacing(10);
		topHBox.getChildren().addAll(logo, drawText, drawSpinner, spotText, spotSpinner, readyButton);

		//MIDDLE CONTENT
		KenoGrid kenoGrid = new KenoGrid(theme);
		kenoGrid.setPrefSize(500, 500);
		kenoGrid.setAlignment(Pos.CENTER);

		//BOTTOM CONTENT
		//random select button
		Button randomButton = new Button();
		Image randomImage = new Image("dieicon.png");
		ImageView randomImageView = new ImageView(randomImage);
		randomImageView.setFitHeight(40);
		randomImageView.setFitWidth(40);
		randomButton.setGraphic(randomImageView);
		randomButton.setPrefSize(50, 50);
		randomButton.setDisable(true);

		//draw button
		Button drawButton = new Button("Draw!");
		drawButton.setDisable(true);
		drawButton.setPrefSize(100, 50);

		//result text
		Text resultsText = new Text("After you've locked in your draw and spot amounts, " +
				"select the numbers you wish to play or let the computer select them for you. " +
				"Then you're ready to draw... Good luck!");
		if(theme == 1) {
			resultsText.setStyle("-fx-font-size: 12px; -fx-fill: black;");
		} else {
			resultsText.setStyle("-fx-font-size: 12px; -fx-fill: white;");
		}
		resultsText.setWrappingWidth(270);

		//right hand character
		ImageView boss;
		if(theme == 0)
			boss = new ImageView(new Image("boss.png"));
		else
			boss = new ImageView(new Image("hellokitty.png"));
		boss.setFitHeight(100);
		boss.setFitWidth(100);

		//Bottom Container
		HBox bottomHBox = new HBox();
		bottomHBox.setPrefSize(500, 100);
		bottomHBox.setAlignment(Pos.CENTER);
		bottomHBox.setSpacing(10);
		bottomHBox.getChildren().addAll(randomButton, drawButton, resultsText, boss);

		//EVENT HANDLERS
		//
		//Ready Button
		//Disables spinners and itself then starts the game.
		//Moves the application into the next phase (spot selection)
		readyButton.setOnAction(e->{
			drawSpinner.setDisable(true);
			spotSpinner.setDisable(true);
			readyButton.setDisable(true);
			randomButton.setDisable(false);
			kenoGrid.enableAll();
			keno.start((int)spotSpinner.getValue(), (int)drawSpinner.getValue());
		});

		//KenoButtons
		//Update the Keno object
		buttons = kenoGrid.getButtons();
		for(KenoButton button : buttons) {
			button.setOnAction(e->{
				if(!button.isSelected()) {
					button.setStyle(buttonSelected);
					button.setSelected(true);
					keno.selectNumber(button.getNumber());
				} else {
					button.setStyle(buttonUnselected);
					button.setSelected(false);
					keno.unselectNumber(button.getNumber());
				}
				if(!keno.canPick()) {
					kenoGrid.disableNonSelected();
					drawButton.setDisable(false);
				} else {
					kenoGrid.enableAll();
				}
			});
		}
		randomButton.setOnAction(e->{
			kenoGrid.arraySelected(keno.randomSelect());
			kenoGrid.disableNonSelected();
			drawButton.setDisable(false);
		});

		//Draw button
		//Tells the Keno object to draw and then updates the KenoGrid
		//to show the results. Repeats Phase 2 until out of draws.
		drawButton.setOnAction(e->{
			keno.newDraw();
			kenoGrid.displayWinningNumbers(keno.getWinningNumbers());
			resultsText.setText(keno.getResults());
			drawButton.setText("Draw! (" + keno.getDrawsLeft() + " left)");
			if(keno.getDrawsLeft() == 0) {
				drawButton.setDisable(true);
				kenoGrid.disableAll();
				new Thread(() -> {
					try {
						Thread.sleep(3000);
					} catch (InterruptedException e1) {
						e1.printStackTrace();
					}
					Platform.runLater(() -> gameOver(keno.getFinalResults(), primaryStage, theme));
				}).start();
			}
		});


		VBox startVBox = new VBox(menuBar(primaryStage, 1, theme), topHBox, kenoGrid, bottomHBox);
		startVBox.setBackground(new Background(background));
		return new Scene(startVBox, 620, 700);
	}

	@Override
	public void start(Stage primaryStage) throws Exception {
		primaryStage.setTitle("Dylan Brunelle Project 2");
		primaryStage.setScene(startScene(primaryStage));
		primaryStage.show();
	}

}
