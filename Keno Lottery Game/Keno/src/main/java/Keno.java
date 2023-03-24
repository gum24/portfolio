import java.util.ArrayList;

public class Keno {

    private int numPicks;
    private int numDraws;
    private int picksLeft;
    private int drawsLeft;
    private int winnings;
    private ArrayList<Integer> selectedNumbers;
    private ArrayList<Integer> winningNumbers;

    /*
     * Keno()
     *
     * Constructor for Keno class. Starts a new game
     * with a given numPicks picks and numDraws draws.
     * Initializes selectedNumbers and winningNumbers
     * to empty ArrayLists.
     */
    public Keno() {
        this.numPicks = 0;
        this.numDraws = 0;
        this.picksLeft = 0;
        this.drawsLeft = 0;
        winnings = 0;
        selectedNumbers = new ArrayList<Integer>();
        winningNumbers = new ArrayList<Integer>();
    }

    public void start(int numPicks, int numDraws) {
        this.numPicks = numPicks;
        this.numDraws = numDraws;
        this.picksLeft = numPicks;
        this.drawsLeft = numDraws;
    }

    /*
     * selectNumber()
     *
     * Adds a number to the selected numbers list if
     * there are any picks left. Decreases numPicks by 1.
     */
    public void selectNumber(int num) {
        if(canPick() && !selectedNumbers.contains(num)) {
            selectedNumbers.add(num);
            picksLeft--;
        }
    }

    /*
     * unselectNumber()
     *
     * Removes a number to the selected numbers list if
     * it exists in selectedNumbers. Increases numPicks by 1.
     */
    public void unselectNumber(int num) {
        if(selectedNumbers.contains(num)) {
            selectedNumbers.remove(selectedNumbers.indexOf(num));
            picksLeft++;
        }
    }

    /*
     * canPick()
     *
     * Returns true if there are any picks left, false otherwise.
     */
    public boolean canPick() {
        if (picksLeft > 0) { return true; }
        else { return false; }
    }

    /*
     * randomSelect()
     *
     * Randomly selects numPicks number of spots.
     * Returns an ArrayList of the numbers chosen.
     */
    public ArrayList<Integer> randomSelect() {
        selectedNumbers.clear();
        ArrayList<Integer> nums = new ArrayList<>();
        for(int i = 1; i <= 80; i++) {
            nums.add(i);
        }
        for(int i = 0; i < numPicks; i++) {
            int rand = (int)(Math.random() * nums.size());
            selectedNumbers.add(nums.get(rand));
            nums.remove(rand);
        }
        picksLeft = 0;
        return selectedNumbers;
    }

    /*
     * newDraw()
     *
     * Clears current winning numbers list and sets
     * the winning numbers to a new set of 20 unique
     * random numbers, if there are any draws left.
     * Decreases numDraws by 1. Returns true if able
     * to draw again. Adds winnings to total winnings.
     */
    public boolean newDraw() {
        if(drawsLeft == 0 || picksLeft != 0) {
            System.out.println("ERROR: Cannot draw. Picks left: " + picksLeft + " Draws left: " + drawsLeft);
            return false;
        } //security check, but should never be returned
        winningNumbers.clear();
        ArrayList<Integer> nums = new ArrayList<>();
        for(int i = 1; i <= 80; i++) {
            nums.add(i);
        }
        for(int i = 0; i < 20; i++) {
            int rand = (int)(Math.random() * nums.size());
            winningNumbers.add(nums.get(rand));
            nums.remove(rand);
        }
        drawsLeft--;
        winnings += getWinnings();
        if(drawsLeft == 0) { return false; }
        else { return true; }
    }

    /*
     * getMatches()
     *
     * Used for calculating winnings and reporting results.
     * Returns an ArrayList of all numbers that are in both
     * the selected numbers list and the winning numbers list.
     */
    ArrayList<Integer> getMatches() {
        ArrayList<Integer> matches = new ArrayList<Integer>();
        for (int i = 0; i < selectedNumbers.size(); i++) {
            if (winningNumbers.contains(selectedNumbers.get(i))) {
                matches.add(selectedNumbers.get(i));
            }
        }
        return matches;
    }

    /*
     * getWinnings()
     *
     * Returns the amount of money won based on the number
     * of picks and matches.
     */
    public int getWinnings() {
        int matches = getMatches().size();

        switch(numPicks) {
            case 1:
                if(matches == 1) return 2;
                else return 0;
            case 4:
                switch(matches) {
                    case 2: return 1;
                    case 3: return 5;
                    case 4: return 75;
                    default: return 0;
                }
            case 8:
                switch(matches) {
                    case 4: return 2;
                    case 5: return 12;
                    case 6: return 50;
                    case 7: return 750;
                    case 8: return 10000;
                    default: return 0;
                }
            case 10:
                switch (matches) {
                    case 0: return 5;
                    case 5: return 2;
                    case 6: return 15;
                    case 7: return 40;
                    case 8: return 450;
                    case 9: return 4250;
                    case 10: return 100000;
                    default: return 0;
                }
        }


        return 0;
    }

    /*
     * getResults()
     *
     * Returns a String of the results of the game.
     * If there are no matches, returns a message saying so.
     * If there is one match, returns a message saying so
     * and the amount of money won.
     * If there are multiple matches, returns a message
     * saying so and the amount of money won, as well as
     * a list of all the numbers that were matched.
     */
    public String getResults() {
        if(getMatches().size() == 0) {
            return "You did not match any numbers. Better luck next time.";
        } else if (getMatches().size() == 1) {
            return "You matched a lucky number " + getMatches().get(0) + ", earning you $" + getWinnings();
        } else {
            String result = "You've earned $" + getWinnings() + " matching " + getMatches().size() + " numbers. Not bad!\nMatched: ";
            for(int i = 0; i < getMatches().size(); i++) {
                if(i == getMatches().size() - 1) {
                    result += "and " + getMatches().get(i) + ".";
                } else {
                    result += getMatches().get(i) + ", ";
                }
            }
            return result;
        }
    }

    /*
     * getFinalResults()
     *
     * Returns a String array of the final results of the game.
     * The first element is the title of the results, and the
     * second element is the message.
     */
    public String[] getFinalResults() {
        String[] results = new String[2];
        if(winnings - numDraws > 0) {
            results[0] = "YOU BEAT THE ODDS";
            results[1] = "You earned $" + (winnings - numDraws) + " in " + numDraws + " draws. You're one lucky cat.";
        } else if(winnings - numDraws == 0) {
            results[0] = "YOU BROKE EVEN";
            results[1] = "You broke even after " + numDraws + " draws. Perhaps you'd like to play again?";
        } else {
            results[0] = "THE HOUSE ALWAYS WINS";
            results[1] = "You lost $" + (numDraws - winnings) + " after " + numDraws + " draws. Better luck next time.";
        }
        return results;
    }


    //GETTERS BELOW
    /*
     * getWinningNumbers()
     *
     * Returns the winning numbers list.
     */
    public ArrayList<Integer> getWinningNumbers() {
        return winningNumbers;
    }

    /*
     * getSelectedNumbers()
     *
     * Returns the selected numbers list.
     */
    public ArrayList<Integer> getSelectedNumbers() {
        return selectedNumbers;
    }

    /*
     * getPicksLeft()
     *
     * Returns the number of picks left.
     */
    public int getPicksLeft() {
        return picksLeft;
    }

    /*
     * getDrawsLeft()
     *
     * Returns the number of draws left.
     */
    public int getDrawsLeft() {
        return drawsLeft;
    }

    //SETTERS BELOW (FOR TESTING ONLY)
    /*
     * setWinningNumbers()
     *
     * Sets the winning numbers list to the given list.
     */
    public void setWinningNumbers(ArrayList<Integer> nums) {
        winningNumbers = nums;
        winnings += getWinnings();
    }

}
