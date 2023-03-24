import javafx.animation.PauseTransition;
import javafx.scene.layout.GridPane;

import java.util.ArrayList;

public class KenoGrid extends GridPane {
    private final ArrayList<KenoButton> buttons; //list of all 80 buttons
    private final String buttonSelected; //color of selected button
    private final String buttonUnselected; //color of unselected button

    /*
     * KenoGrid()
     * Constructor for KenoGrid class. Creates a 8x10 grid of KenoButtons.
     * Sets up the color themes for the buttons.
     * Begins with all buttons disabled.
     */
    public KenoGrid(int theme) {
        //COLOR THEMES FOR NEW LOOK
        if(theme == 0) {
            buttonSelected = "-fx-background-color: rgb(231,222,81)";
            buttonUnselected = "-fx-background-color: rgba(162,159,85)";
        }
        else {
            buttonSelected = "-fx-background-color: rgb(255,101,194)";
            buttonUnselected = "-fx-background-color: rgb(215,88,156)";

        }

        //SETUP GRID
        this.setHgap(5);
        this.setVgap(5);
        buttons = new ArrayList<>();
        for(int i = 0; i < 8; i++) {
            for(int j = 0; j < 10; j++) {
                buttons.add(new KenoButton(i * 10 + j + 1));
                this.add(buttons.get(i * 10 + j), j, i);
            }
        }

        //BEGIN WITH ALL BUTTONS DISABLED
        this.disableAll();
    }

    /*
     * getButtons()
     * Returns the list of all buttons.
     */
    public ArrayList<KenoButton> getButtons() {
        return buttons;
    }

    /*
     * enableAll()
     * Enables all buttons.
     */
    public void enableAll() {
        for(KenoButton b : buttons) {
            b.setDisable(false);
        }
    }

    /*
     * disableNonSelected()
     * Disables all buttons that are not selected.
     */
    public void disableNonSelected() {
        for(KenoButton b : buttons) {
            if(!b.isSelected()) {
                b.setDisable(true);
            }
        }
    }

    /*
     * disableAll()
     * Disables all buttons
     */
    public void disableAll() {
        for(KenoButton b : buttons) {
            b.setStyle(buttonUnselected);
            b.setDisable(true);
        }
    }

    /*
     * arraySelected()
     * Takes an ArrayList of integers and
     * selects the corresponding buttons.
     */
    public void arraySelected(ArrayList<Integer> selected) {
        enableAll();
        for(KenoButton b : buttons) {
            if(selected.contains(b.getNumber())) {
                b.setSelected(true);
                b.setStyle(buttonSelected);
            } else {
                b.setSelected(false);
                b.setStyle(buttonUnselected);
            }
        }
        disableNonSelected();
    }


    /*
     * getSelected()
     * Returns an ArrayList of the numbers of all selected buttons.
     */
    public ArrayList<Integer> getSelected() {
        ArrayList<Integer> selected = new ArrayList<>();
        for(int i = 0; i < buttons.size(); i++) {
            if(buttons.get(i).isSelected()) {
                selected.add(buttons.get(i).getNumber());
            }
        }
        return selected;
    }

    /*
     * displayWinningNumbers()
     * Takes an ArrayList of integers and displays the winning numbers.
     * Green for selected, red for not selected.
     * Animated the numbers being displayed one at a time
     */
    public void displayWinningNumbers(ArrayList<Integer> winningNumbers) {
        clearWinningNumbers();
        disableAll();
        for(KenoButton b : buttons) {
            if(b.isSelected()) {
                b.setOpacity(1);
            }
        }
        new Thread(new Runnable() {
            @Override
            public void run() {
                for(int i = 0; i < winningNumbers.size(); i++) {
                    try {
                        Thread.sleep(100);
                        if(buttons.get(winningNumbers.get(i) - 1).isSelected()) {
                            buttons.get(winningNumbers.get(i) - 1).setStyle("-fx-background-color: rgba(0,255,0)");
                        } else {
                            buttons.get(winningNumbers.get(i) - 1).setStyle("-fx-background-color: rgba(255,0,0)");
                        }
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        }).start();
    }

    /*
     * clearWinningNumbers()
     * Clears the winning numbers from the grid.
     * Resets all buttons to unselected.
     */
    public void clearWinningNumbers() {
        for(KenoButton b : buttons) {
            b.setStyle(buttonUnselected);
        }
    }
}
