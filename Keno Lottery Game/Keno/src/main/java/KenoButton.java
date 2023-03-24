import javafx.scene.control.Button;

public class KenoButton extends Button {
    private int number; //spot number/label
    private boolean selected; //whether or not the button is selected

    /*
     * KenoButton()
     * Constructor makes a button with a given spot
     * number.
     */
    public KenoButton(int number) {
        super("" + number);
        super.setPrefSize(50, 50);
        this.number = number;
        this.selected = false;
    }

    //getters and setters
    public int getNumber() {
        return number;
    }

    public boolean isSelected() {
        return selected;
    }

    public void setSelected(boolean selected) {
        this.selected = selected;
    }
}
