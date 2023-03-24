import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

class MyTest {

	@Test
	void testKenoConstructor() {
		Keno k = new Keno();
		k.start(10, 4);
		assertEquals(0, k.getSelectedNumbers().size());
		assertEquals(0, k.getWinningNumbers().size());
	}

	@Test
	void testKenoStart() {
		Keno k = new Keno();
		k.start(10, 4);
		assertEquals(10, k.getPicksLeft());
		assertEquals(4, k.getDrawsLeft());
		assertEquals(0, k.getSelectedNumbers().size());
		assertEquals(0, k.getWinningNumbers().size());
	}

	@Test
	void testKenoSelectNumber() {
		Keno k = new Keno();
		k.start(10,4);
		k.selectNumber(1);
		assertEquals(1, k.getSelectedNumbers().size());
		assertEquals(9, k.getPicksLeft());
	}

	@Test
	void testKenoSelectNumber2() {
		Keno k = new Keno();
		k.start(10,4);
		k.selectNumber(1);
		k.selectNumber(1);
		assertEquals(1, k.getSelectedNumbers().size());
		assertEquals(9, k.getPicksLeft());
	}

	@Test
	void testKenoSelectNumber3() {
		Keno k = new Keno();
		k.start(10,4);
		k.selectNumber(1);
		k.selectNumber(2);
		assertEquals(2, k.getSelectedNumbers().size());
		assertEquals(8, k.getPicksLeft());
	}

	@Test
	void testKenoUnselectNumber() {
		Keno k = new Keno();
		k.start(10,4);
		k.selectNumber(1);
		k.unselectNumber(1);
		assertEquals(0, k.getSelectedNumbers().size());
		assertEquals(10, k.getPicksLeft());
	}

	@Test
	void testKenoUnselectNumber2() {
		Keno k = new Keno();
		k.start(10,4);
		k.selectNumber(1);
		k.unselectNumber(2);
		assertEquals(1, k.getSelectedNumbers().size());
		assertEquals(9, k.getPicksLeft());
	}

	@Test
	void testKenoUnselectNumber3() {
		Keno k = new Keno();
		k.start(10,4);
		k.selectNumber(1);
		k.selectNumber(2);
		k.unselectNumber(1);
		assertEquals(1, k.getSelectedNumbers().size());
		assertEquals(9, k.getPicksLeft());
	}

	@Test
	void testKenoDraw() {
		Keno k = new Keno();
		k.start(1, 4);
		k.selectNumber(1);
		k.newDraw();
		assertEquals(20, k.getWinningNumbers().size());
		assertEquals(3, k.getDrawsLeft());
	}

	@Test
	void testKenoDraw2() {
		Keno k = new Keno();
		k.start(1, 4);
		k.selectNumber(1);
		k.newDraw();
		k.newDraw();
		k.newDraw();
		k.newDraw();
		assertEquals(0, k.getDrawsLeft());
	}

	@Test
	void testKenoDraw3() {
		Keno k = new Keno();
		k.start(1, 4);
		k.selectNumber(1);
		k.newDraw();
		k.newDraw();
		k.newDraw();
		k.newDraw();
		k.newDraw();
		assertEquals(0, k.getDrawsLeft());
	}

	@Test
	void testKenoCanPick() {
		Keno k = new Keno();
		k.start(1,4);
		assertTrue(k.canPick());
		k.selectNumber(1);
		assertFalse(k.canPick());
	}

	@Test
	void testKenoCanPick2() {
		Keno k = new Keno();
		k.start(1,4);
		assertTrue(k.canPick());
		k.selectNumber(1);
		assertFalse(k.canPick());
		k.newDraw();
		assertFalse(k.canPick());
	}

	@Test
	void testKenoCanPick3() {
		Keno k = new Keno();
		k.start(4,4);
		assertTrue(k.canPick());
		k.selectNumber(1);
		assertTrue(k.canPick());
		k.selectNumber(2);
		assertTrue(k.canPick());
		k.selectNumber(3);
		assertTrue(k.canPick());
		k.selectNumber(4);
		assertFalse(k.canPick());
	}

	@Test
	void testKenoGetWinnings1() {
		Keno k = new Keno();
		k.start(4,4);
		k.selectNumber(1);
		k.selectNumber(2);
		k.selectNumber(3);
		k.selectNumber(4);
		k.setWinningNumbers(new ArrayList<>(List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20)));
		assertEquals(75, k.getWinnings());
	}

	@Test
	void testKenoGetWinnings2() {
		Keno k = new Keno();
		k.start(4,4);
		k.selectNumber(1);
		k.selectNumber(2);
		k.selectNumber(21);
		k.selectNumber(22);
		k.setWinningNumbers(new ArrayList<>(List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20)));
		assertEquals(1, k.getWinnings());
	}

	@Test
	void testKenoGetWinnings3() {
		Keno k = new Keno();
		k.start(8,4);
		k.selectNumber(1);
		k.selectNumber(2);
		k.selectNumber(3);
		k.selectNumber(4);
		k.selectNumber(5);
		k.selectNumber(6);
		k.selectNumber(7);
		k.selectNumber(8);
		k.setWinningNumbers(new ArrayList<>(List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20)));
		assertEquals(10000, k.getWinnings());
	}

	@Test
	void testKenoGetWinnings4() {
		Keno k = new Keno();
		k.start(4,1);
		k.selectNumber(1);
		k.selectNumber(2);
		k.selectNumber(77);
		k.selectNumber(78);
		k.setWinningNumbers(new ArrayList<>(List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20)));
		assertEquals(1, k.getWinnings());
	}

	@Test
	void testKenoGetMatches() {
		Keno k = new Keno();
		k.start(4,4);
		k.selectNumber(1);
		k.selectNumber(2);
		k.selectNumber(3);
		k.selectNumber(4);
		k.setWinningNumbers(new ArrayList<>(List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20)));
		ArrayList<Integer> matches = new ArrayList<>(List.of(1, 2, 3, 4));
		assertEquals(matches, k.getMatches());
	}

	@Test
	void testKenoGetMatches2() {
		Keno k = new Keno();
		k.start(4,4);
		k.selectNumber(1);
		k.selectNumber(2);
		k.selectNumber(77);
		k.selectNumber(78);
		k.setWinningNumbers(new ArrayList<>(List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20)));
		ArrayList<Integer> matches = new ArrayList<>(List.of(1, 2));
		assertEquals(matches, k.getMatches());
	}

	@Test
	void testKenoGetFinalResults() {
		Keno k = new Keno();
		k.start(4,1);
		k.selectNumber(1);
		k.selectNumber(2);
		k.selectNumber(3);
		k.selectNumber(4);
		k.setWinningNumbers(new ArrayList<>(List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20)));
		assertEquals("YOU BEAT THE ODDS", k.getFinalResults()[0]);
	}

	@Test
	void testKenoGetFinalResults2() {
		Keno k = new Keno();
		k.start(4,1);
		k.selectNumber(1);
		k.selectNumber(2);
		k.selectNumber(77);
		k.selectNumber(78);
		k.setWinningNumbers(new ArrayList<>(List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20)));
		assertEquals("YOU BROKE EVEN", k.getFinalResults()[0]);
	}

	@Test
	void testKenoGetFinalResults3() {
		Keno k = new Keno();
		k.start(1,1);
		k.selectNumber(80);
		k.setWinningNumbers(new ArrayList<>(List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20)));
		assertEquals("THE HOUSE ALWAYS WINS", k.getFinalResults()[0]);
	}

	@Test
	void testKenoGetResults() {
		Keno k = new Keno();
		k.start(4,1);
		k.selectNumber(77);
		k.selectNumber(78);
		k.selectNumber(79);
		k.selectNumber(90);
		k.setWinningNumbers(new ArrayList<>(List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20)));
		assertEquals("You did not match any numbers. Better luck next time.", k.getResults());
	}

	@Test
	void testKenoGetResults2() {
		Keno k = new Keno();
		k.start(4,1);
		k.selectNumber(1);
		k.selectNumber(2);
		k.selectNumber(3);
		k.selectNumber(4);
		k.setWinningNumbers(new ArrayList<>(List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20)));
		assertEquals("You've earned $75 matching 4 numbers. Not bad!\nMatched: 1, 2, 3, and 4.", k.getResults());
	}


}
